import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ipcRenderer } from 'electron';

function Home() {
  const [appVersion, setAppVersion] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  
  useEffect(() => {
    ipcRenderer.send('app_version');
    
    ipcRenderer.on('app_version', (event, data) => {
      ipcRenderer.removeAllListeners('app_version');
      setAppVersion(data.version);
    });
    
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      setUpdateMessage('업데이트 파일을 다운로드 중입니다...');
      setNotificationVisible(true);
    });
    
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      setUpdateMessage(
        '업데이트 파일 다운로드를 마쳤습니다. \n 재시작을 하면 업데이트 버전이 실행됩니다. \n 재시작 하시겠습니까?'
      );
      setNotificationVisible(true);
    });
    
  }, []);
  
  function closeNotification() {
    setNotificationVisible(false);
  }
  
  function restartApp() {
    ipcRenderer.send('restart_app');
  }
  
  return (
    <React.Fragment>
      <Head>
        <title>너두마케터</title>
      </Head>
      {notificationVisible && (
        <div className="notification">
          <div className="notification-modal">
            <h2 className="modal-title">업데이트 안내</h2>
            <h2 id="version">{appVersion}</h2>
            <p className="update-message">{updateMessage}</p>
            <div className="updater-btn-wrapper">
              <button id="close-button" className="btn btn-secondary" onClick={closeNotification}>
                닫기
              </button>
              <button id="restart-button" className="btn btn-primary" onClick={restartApp}>
                재시작
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="loading-wrapper hidden">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div>
      </div>
      
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/goingUp">
          <a className="btn-blue">Go to goingUp page</a>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Home;
