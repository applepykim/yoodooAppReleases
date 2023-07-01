import LoginRegister from "./components/loginRegister";
import DataLists from "./components/dataLists";
import MyKeywordAllLists from "./components/myKeywordAllLists";

export default function GoingUpPresenter(props) {
  const {
    myGoingUp,
    setMyGoingup,
    handleChangeMyGoingUp,
    dataList,
    handleClickMyDataSubmit,
    handleClickRemoveMyData,
    setInputRef,
    handleClickLogInConfirm,
    myLogInList,
    handleClickLogInDelete,
    handleClickGoingUpStart,
    myDataState,
    handleClickGoingUpCancel,
    myKeywordAllLists,
    goingupData,
    newState,
    isStarting,
    setIsStarting,
  } = props;

  return (
    <div>
      <div className={"flex justify-center"}>
        <div className={"flex flex-col gap-5"}>
          <div className={"flex justify-center text-xl"}>고잉업</div>
          <div>
            <label
              htmlFor="keyword"
              className="block text-base font-medium leading-6 text-gray-900"
            >
              조회할 키워드를 넣어주세요
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                name="keyword"
                ref={(ref) => setInputRef("keyword", ref)}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            작업주소 :{" "}
            <input
              type={"text"}
              name={"url"}
              // value={myGoingUp?.url}
              placeholder={"https:// or www."}
              // onChange={handleChangeMyGoingUp}
              ref={(ref) => setInputRef("url", ref)}
              className={"pl-3 bg-amber-100 border-2 border-amber-700 w-96"}
            />
          </div>
          <div>
            체류시간 :{" "}
            <input
              type={"number"}
              name={"duration1"}
              defaultValue={15}
              ref={(ref) => setInputRef("duration1", ref)}
              className={
                "text-center bg-amber-100 border-2 border-amber-700 w-14"
              }
            />{" "}
            -{" "}
            <input
              type={"number"}
              name={"duration2"}
              defaultValue={15}
              ref={(ref) => setInputRef("duration2", ref)}
              className={
                "text-center bg-amber-100 border-2 border-amber-700 w-14"
              }
            />
          </div>
          <div>
            타이틀 :{" "}
            <input
              type={"text"}
              name={"title"}
              placeholder={"나만의 타이틀 넣기"}
              ref={(ref) => setInputRef("title", ref)}
              className={"pl-3 bg-amber-100 border-2 border-amber-700 w-96"}
            />
          </div>
          <div className={"flex justify-center gap-6"}>
            <button
              onClick={handleClickMyDataSubmit}
              type="button"
              className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >{" "}
              등록하기
            </button>
            <button
              type="button"
              className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              리셋하기
            </button>
          </div>
        </div>
      </div>

      <LoginRegister
        setInputRef={setInputRef}
        handleClickLogInConfirm={handleClickLogInConfirm}
      />

      <div className={"bg-amber-50 flex w-full h-3 mt-16"}> </div>
      <div className={"flex justify-center mt-16"}>
        <div>
          <div className={"flex gap-6 flex-wrap mb-12"}>
            {myLogInList.map((elm, index) => (
              <div key={index}>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 mr-2">
                  <span className="text-xs font-medium leading-none text-white">
                    {index + 1}
                  </span>
                </span>
                {elm.id}{" "}
                <button
                  onClick={() => handleClickLogInDelete(index)}
                  type="button"
                  className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
          <div className={"flex justify-center gap-6"}>
            <button
              onClick={() => {
                handleClickGoingUpStart();
              }}
              disabled={isStarting}
              type="button"
              className={`${!isStarting && 'bg-blue-100'} rounded px-2 py-1 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
            >
              작업시작
            </button>
            {" "}
            <button
              onClick={handleClickGoingUpCancel}
              type="button"
              className="rounded bg-white px-2 py-1 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
            >
              작업중지
            </button>
          </div>
          <div className={"flex justify-center"}>
            <div className={"bg-amber-100 text-xl p-3 m-6 rounded-xl"}>
              {myDataState}
            </div>
          </div>
          <div>
            <div className={"flex gap-6 flex-wrap justify-center"}>
              {dataList.map((elm, index) => (
                <div key={index}>
                  <DataLists
                    keyword={elm.keyword}
                    url={elm.url}
                    duration={elm.duration}
                    title={elm.title}
                    index={index}
                    handleClickRemoveMyData={handleClickRemoveMyData}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={"flex justify-center"}>
        <div>
          <MyKeywordAllLists myKeywordAllLists={myKeywordAllLists} />
        </div>
      </div>
    </div>
  );
}
