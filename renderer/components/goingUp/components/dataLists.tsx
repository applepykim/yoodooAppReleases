import Link from "next/link";

export default function DataLists(props) {
  const { keyword, url, duration, title, handleClickRemoveMyData, index } =
    props;
  let myUrl = url;
  if (!url.includes("https://")) {
    if (url.includes("http://")) {
      myUrl = myUrl.replace("http://", "");
    }
    myUrl = "https://" + myUrl;
  }
  return (
    <div>
      <div className="px-4 sm:px-0 mt-6 flex text-base font-semibold leading-7 text-gray-900 items-center justify-between">
        <h3 className="">{title || "타이틀"}</h3>
        <button
          onClick={() => handleClickRemoveMyData(index)}
          type="button"
          className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          삭제
        </button>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              키워드
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {keyword.map((elm, index) => (
                <div key={index}>{elm}</div>
              ))}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              작업주소
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {myUrl}{" "}
              <Link href={myUrl} target="_blank">
                [링크]
              </Link>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              체류시간
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {duration[0]} - {duration[1]}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
