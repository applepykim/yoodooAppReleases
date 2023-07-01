import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import {naverLogin} from "./goingUp/naverLogin/index.mjs";
import {keywordSearch} from "./goingUp/keywordSearch/index.mjs";
import {moveNextPage} from "./goingUp/moveNextPage/index.mjs";
import {searchMySite} from "./goingUp/searchMySite/index.mjs";
import {autoUpdater} from "electron-updater";

const isProd: boolean = process.env.NODE_ENV === 'production';
// const isProd: boolean = true;
let myBrowser;
let myPage;
let mySiteCheck = false;
const myLoginInfo = {id: "tamoskin", pw: "!ncnncnko"};

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1800,
    height: 1200,
  });
  
  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
    await autoUpdater.checkForUpdatesAndNotify();
    
    ipcMain.on("app_version", (event) => {
      // app_version 채널로 현재 version을 보내는 코드
      event.sender.send("app_version", { version: app.getVersion() });
    });
    
    autoUpdater.on("update-available", () => {
      mainWindow.webContents.send("update_available");
    });
    
    autoUpdater.on("update-downloaded", () => {
      mainWindow.webContents.send("update_downloaded");
    });
    
    ipcMain.on("restart_app", () => {
      // restart_app 채널로 수신 받았을 때
      // autoUpdater의 함수를 사용하여
      // 일렉트론 앱 종료 후 최신 버전으로 다시 설치
      autoUpdater.quitAndInstall();
    });
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

ipcMain.handle("GOINGUP_LOGIN", async (event, args) => {
  const data = JSON.parse(args)
  console.log(data.myLogInList)
  const {page, browser, errorMessage, errorMessage2} = await naverLogin({id: data.myLogInList.id, pw: data.myLogInList.pw})
  myPage = page
  myBrowser =  browser
  if (errorMessage.includes("비밀번호를 잘못") || errorMessage2.includes("비밀번호 또는")) {
    await myBrowser.close();
    return `${myLoginInfo.id} : 로그인 실패`
  }
  event.sender.send('GOINGUP_LOGIN_COMPLETE');
  return `${myLoginInfo.id} : 로그인 성공`
})

ipcMain.handle("GOINGUP_SEARCH", async (event, args) => {
  const myKeyword = JSON.parse(args)
  
  let today = new Date()
  let options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  let count = 0
  mySiteCheck = false
  let mySiteResult
  await keywordSearch({page: myPage, myKeyword: myKeyword.keyword})
  await myPage.waitForTimeout(1000);
  
  while (count < 10 && !mySiteCheck) {
    await moveNextPage({page: myPage})
    mySiteResult = await searchMySite({page: myPage, mySite: myKeyword.url, duration: myKeyword.duration, count: count})
    mySiteCheck = mySiteResult.mySiteCheck
    await myPage.waitForTimeout(1000);
    count++;
  }
  // @ts-ignore
  return {keyword: myKeyword.keyword, myRank: mySiteResult?.count ?? 0, nowDate: today.toLocaleString('ko-KR', options), myDuration: mySiteResult.myDuration}
})

ipcMain.on("GOINGUP_CLOSE", async (event, args) => {
  await myBrowser.close();
})

app.on('window-all-closed', () => {
  app.quit();
});

