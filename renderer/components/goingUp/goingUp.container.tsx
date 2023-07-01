import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ADataList,
  AIsStarting,
  AMyKeywordAllLists,
  AMyLogInList,
} from "./atom";
import GoingUpPresenter from "./goingUp.presenter";
import {goingUpCloseBrowseApi, goingUpLoginApi, goingUpSearchApi} from "./goingUpApi";
import { ipcRenderer } from "electron";

let abortList: any[] = [];
let myKeywordAllListresultArray = [];
const myUpdateDataList = [];
let newState = [];

export default function () {
  const [myKeywordAllLists, setMyKeywordAllLists] =
    useRecoilState(AMyKeywordAllLists);
  const [myGoingUp, setMyGoingUp] = useState({
    keyword: [],
    duration: [15, 15],
    url: "",
    title: "",
  });
  const [dataList, setDataList] = useRecoilState(ADataList);
  const [myLogInList, setMyLogInList] = useRecoilState(AMyLogInList);
  const inputRefs = useRef({});
  const [myDataState, setMyDataState] = useState("");
  const [goingupData, setGoingupData] = useState({});
  const [myUpdateData, setMyUpdateData] = useState();
  const [isStarting, setIsStarting] = useState<boolean>(false);

  // 키워드 등록 삭제할때 마다 배열 새로 만들기
  useEffect(() => {
    myKeywordAllListresultArray = [];
    let maxLength = 0;

    dataList.forEach((obj) => {
      const { keyword } = obj;
      if (keyword.length > maxLength) {
        maxLength = keyword.length;
      }
    });

    for (let i = 0; i < maxLength; i++) {
      dataList.forEach((obj) => {
        const { keyword, duration, url, title } = obj;

        if (keyword[i] !== undefined) {
          myKeywordAllListresultArray.push({
            keyword: keyword[i],
            duration: duration,
            url: url,
            title: title,
          });
        }
      });
    }

    setMyKeywordAllLists(myKeywordAllListresultArray);
  }, [dataList]);

  const setInputRef = (name, ref): void => {
    inputRefs.current[name] = ref;
  };

  const handleChangeMyGoingUp = (e): void => {
    const { name } = e.target;
    if (name === "duration1" || name === "duration2") {
      if (name === "duration1") {
        setMyGoingUp((prevState) => ({
          ...prevState,
          duration: [inputRefs.current[name].value, prevState.duration[1]],
        }));
      } else {
        setMyGoingUp((prevState) => ({
          ...prevState,
          duration: [prevState.duration[0], inputRefs.current[name].value],
        }));
      }
    } else {
      setMyGoingUp((prevState) => ({
        ...prevState,
        [name]: inputRefs.current[name].value,
      }));
    }
  };

  const handleClickMyDataSubmit = () => {
    if (
      inputRefs.current["keyword"].value.length === 0 ||
      inputRefs.current["url"].value.length === 0 ||
      inputRefs.current["title"].value.length === 0
    )
      return alert("값을 입력해 주세요.");

    const myKeyword = inputRefs.current["keyword"].value
      .replaceAll("'", "")
      .replaceAll('"', "");
    let arrKeyword;
    if (myKeyword.includes(",")) {
      arrKeyword = myKeyword.split(",");
    } else {
      arrKeyword = myKeyword.split("\n");
    }

    arrKeyword = arrKeyword
      .map((item) =>
        item
          .replaceAll("\n", "")
          .replaceAll("\t", "")
          .replaceAll('"', "")
          .trim()
      )
      .filter((item) => item.length !== 0);
    const myData = {
      keyword: arrKeyword,
      duration: [
        inputRefs.current["duration1"].value,
        inputRefs.current["duration2"].value,
      ],
      url: inputRefs.current["url"].value,
      title: inputRefs.current["title"].value,
    };

    setDataList((prevState) => [...prevState, myData]);

    setMyGoingUp({
      keyword: [],
      duration: [15, 15],
      url: "",
      title: "",
    });
  };

  const handleClickRemoveMyData = (index) => {
    const updateDataList = [...dataList];
    updateDataList.splice(index, 1);
    setDataList(updateDataList);
  };

  const handleClickLogInConfirm = () => {
    if (
      inputRefs.current["id"].value.length === 0 ||
      inputRefs.current["pw"].value.length === 0
    )
      return alert("값을 입력해 주세요.");
    const myLogIn = {
      id: inputRefs.current["id"].value,
      pw: inputRefs.current["pw"].value,
    };
    setMyLogInList((prevState) => [...prevState, myLogIn]);
  };
  const handleClickLogInDelete = (index) => {
    const updateDataList = [...myLogInList];
    updateDataList.splice(index, 1);
    setMyLogInList(updateDataList);
  };
  
  const findingUrl = async () => {
    let myKeywordCount = 0;
    for (const myKeyword of myKeywordAllListresultArray) {
      // const goingUpSearch = await goingUpSearchApi(
      //   myKeyword,
      //   blockController.signal
      // );
      // const myObjectData = {
      //   myKeyword,
      //   blockController: blockController.signal
      // }
      const serializedData = JSON.stringify(myKeyword);
      const goingUpSearch = await ipcRenderer.invoke("GOINGUP_SEARCH", serializedData);
      
      newState[myKeywordCount] = {
        ...newState[myKeywordCount],
        myRank: goingUpSearch?.myRank,
        nowDate: goingUpSearch?.nowDate,
        myDuration: goingUpSearch?.myDuration,
      };
      
      const newState2 = [...newState];
      
      setMyKeywordAllLists(newState2);
      
      myKeywordCount++;
    }
    ipcRenderer.send("GOINGUP_CLOSE", '');
    setIsStarting(false);
    console.log("마무리")
  }
  
  const goingupSearching = async () => {
    for (let i = 0; i < myLogInList.length; i++) {
      // await goingUpLoginApi(myLogInList[i], blockController.signal);
      const myObject = {
        myLogInList: myLogInList[i]
      }
      const serializedObject = JSON.stringify(myObject)
      await ipcRenderer.invoke("GOINGUP_LOGIN", serializedObject);
      
      newState = [...myKeywordAllListresultArray];
      
      await findingUrl();
      
      // ipcRenderer.once('GOINGUP_LOGIN_COMPLETE', () => {
      //   ipcRenderer.send("GOINGUP_CLOSE", '');
      // });
      
      // await goingUpCloseBrowseApi(blockController.signal);
      // ipcRenderer.once('GOINGUP_LOGIN_COMPLETE', () => {
      //   ipcRenderer.send("GOINGUP_CLOSE", '');
      // });
      //
    }
  }

  const handleClickGoingUpStart = async () => {
    setIsStarting(true);
    myKeywordAllListresultArray = [...myKeywordAllLists];
    
    await goingupSearching();
    // const blockController: AbortController = new AbortController();
    // abortList.push(blockController);
    
  }

  const handleClickGoingUpCancel = () => {
    setIsStarting(false);
    console.log("작업취소");
  };

  return (
    <GoingUpPresenter
      myGoingUp={myGoingUp}
      setMyGoingUp={setMyGoingUp}
      handleChangeMyGoingUp={handleChangeMyGoingUp}
      dataList={dataList}
      handleClickMyDataSubmit={handleClickMyDataSubmit}
      handleClickRemoveMyData={handleClickRemoveMyData}
      setInputRef={setInputRef}
      handleClickLogInConfirm={handleClickLogInConfirm}
      myLogInList={myLogInList}
      handleClickLogInDelete={handleClickLogInDelete}
      handleClickGoingUpStart={handleClickGoingUpStart}
      myDataState={myDataState}
      handleClickGoingUpCancel={handleClickGoingUpCancel}
      myKeywordAllLists={myKeywordAllLists}
      goingupData={goingupData}
      newState={newState}
      isStarting={isStarting}
      setIsStarting={setIsStarting}
    />
  );
}
