import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {ipcRenderer} from "electron";

function Home() {
  const [version, setVersion] = useState<string>("");
  let notification;
  const [message, setMessage] = useState<string>("");
  let closeButton;
  let restartButton;
  
  ipcRenderer.send("app_version"); // app_version 채널로 송신
// app_version 채널에서 송신
  ipcRenderer.on("app_version", (event, data) => {
    // event 모두 종료 후 다음 코드 실행
    ipcRenderer.removeAllListeners("app_version");
    // 업데이트가 필요한 경우 현재 버전을 알려주는 메시지입니다.
    setVersion(`현재 버전:  ${data.version}`);
  });
  
  
  ipcRenderer.on("update_available", () => {
    ipcRenderer.removeAllListeners("update_available");
    setMessage("업데이트 파일을 다운로드 중입니다...");
    // notification.classList.remove("hidden");
  });

// update_downloaded 채널로 송/수신
  ipcRenderer.on("update_downloaded", () => {
    ipcRenderer.removeAllListeners("update_downloaded");
    // 업데이트 완료 후 해당 메시지를 보여줍니다.
    setMessage("업데이트 파일 다운로드를 마쳤습니다. \n 재시작을 하면 업데이트 버전이 실행됩니다. \n 재시작 하시겠습니까?");
    // 닫기 / 재시작 버튼을 렌더링합니다.
    // restartButton.classList.remove("hidden");
    // notification.classList.remove("hidden");
  });
  
  function closeNotification() {
    // notification.classList.add("hidden");
  }
  function restartApp() {
    ipcRenderer.send("restart_app");
  }
  
  
  return (
    <React.Fragment>
      <Head>
        <title>너두마케터</title>
      </Head>
      <div>
        <div>현재버전 : {version}</div>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/goingUp'>
          <a className='btn-blue'>Go to goingUp page</a>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Home;
