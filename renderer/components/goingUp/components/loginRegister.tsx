
export default function LoginRegister(props): JSX.Element {
  const { setInputRef, handleClickLogInConfirm } = props;
  return (
    <div className={"flex justify-center mt-9"}>
      <div className={"flex flex-col gap-6"}>
        <div>
          아이디 :{" "}
          <input
            type={"text"}
            name={"id"}
            placeholder={"naver id"}
            className={"pl-3 bg-blue-100 border-2 border-blue-700 w-44"}
            ref={(ref) => setInputRef("id", ref)}
          />
        </div>
        <div>
          비밀번호 :{" "}
          <input
            type={"password"}
            name={"pw"}
            placeholder={"password"}
            ref={(ref) => setInputRef("pw", ref)}
            className={"pl-3 bg-blue-100 border-2 border-blue-700 w-40"}
          />
        </div>
        <div className={"flex justify-center gap-6"}>
          <button
            onClick={handleClickLogInConfirm}
            type="button"
            className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            등록하기
          </button>
          {" "}
          <button
            type="button"
            className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            리셋하기
          </button>
        </div>
      </div>
    </div>
  );
}
