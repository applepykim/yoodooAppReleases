import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import {naverLogin} from "./goingUp/naverLogin/index.mjs";
import {keywordSearch} from "./goingUp/keywordSearch/index.mjs";
import {moveNextPage} from "./goingUp/moveNextPage/index.mjs";
import {searchMySite} from "./goingUp/searchMySite/index.mjs";
// import {autoUpdater} from "electron-updater";
import { autoUpdater } from 'electron-updater'
import log from "electron-log";

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
  
  await autoUpdater.checkForUpdates();
  
  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
    
    autoUpdater.on('checking-for-update', () => {
      log.info('업데이트 확인 중...');
    });
    autoUpdater.on('update-available', (info) => {
      log.info('업데이트가 가능합니다.');
    });
    autoUpdater.on('update-not-available', (info) => {
      log.info('현재 최신버전입니다.');
    });
    autoUpdater.on('error', (err) => {
      log.info('에러가 발생하였습니다. 에러내용 : ' + err);
    });
    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
      log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
      log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
      log.info(log_message);
    })
    autoUpdater.on('update-downloaded', (info) => {
      log.info('업데이트가 완료되었습니다.');
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

