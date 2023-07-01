
const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};
const items = [
  {
    date: "Toitem",
    dateTime: "2023-03-22",
    transactions: [
      {
        id: 1,
        invoiceNumber: "00012",
        href: "#",
        amount: "$7,600.00 USD",
        tax: "$500.00",
        status: "Paid",
        client: "Reform",
        description: "Website redesign",
      },
      {
        id: 2,
        invoiceNumber: "00011",
        href: "#",
        amount: "$10,000.00 USD",
        status: "Withdraw",
        client: "Tom Cook",
        description: "Salary",
      },
      {
        id: 3,
        invoiceNumber: "00009",
        href: "#",
        amount: "$2,000.00 USD",
        tax: "$130.00",
        status: "Overdue",
        client: "Tuple",
        description: "Logo design",
      },
    ],
  },
  {
    date: "Yesteritem",
    dateTime: "2023-03-21",
    transactions: [
      {
        id: 4,
        invoiceNumber: "00010",
        href: "#",
        amount: "$14,000.00 USD",
        tax: "$900.00",
        status: "Paid",
        client: "SavvyCal",
        description: "Website redesign",
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MyKeywordAllLists(props) {
  const { myKeywordAllLists } = props;
  return (
    <div>
      <div className="mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
          내 작업 키워드 순서 리스트 (총 {myKeywordAllLists.length}개)
        </h2>
      </div>
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden sm:table-cell">Client</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {myKeywordAllLists.map((item, index) => {
                  let myUrl = item.url;
                  if (!item.url.includes("https")) {
                    myUrl = `https://${item.url}`;
                  }
                  return (
                    <tr key={index}>
                      <td className="relative py-5 pr-6">
                        <div className="flex flex-wrap gap-x-6">
                          {/*<item.icon*/}
                          {/*  className="hidden h-6 w-5 flex-none text-gray-400 sm:block"*/}
                          {/*  aria-hidden="true"*/}
                          {/*/>*/}
                          {index + 1}
                          <div className="flex-auto">
                            <div className="flex flex-wrap items-start gap-x-3">
                              <div className="text-sm font-medium leading-6 text-gray-900">
                                {item.keyword}
                              </div>
                              {/*<div*/}
                              {/*  className={classNames(*/}
                              {/*    statuses[item.keyword],*/}
                              {/*    "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"*/}
                              {/*  )}*/}
                              {/*>*/}
                              {/*  {item.keyword}*/}
                              {/*</div>*/}
                            </div>
                            {item.duration ? (
                              <div className="mt-1 text-xs leading-5 text-gray-500">
                                {item.title}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                        <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                      </td>
                      <td className="hidden py-5 pr-6 sm:table-cell">
                        <div className="text-sm leading-6 text-gray-900">
                          조회시간 : {item?.nowDate}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          셋팅시간 : {item.duration[0]} - {item.duration[1]} /
                          체류시간 :{" "}
                          {item.myDuration !== undefined
                            ? item.myDuration / 1000
                            : "랜덤"}{" "}
                          초
                        </div>
                      </td>
                      <td className="py-5 text-right">
                        <div className="flex justify-between gap-6">
                          <div>순위 : {item?.myRank}</div>

                          <a
                            href={myUrl}
                            target={"_blank"}
                            className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                          >
                            링크
                            {/*<span className="hidden sm:inline"> item</span>*/}
                            {/*<span className="sr-only">*/}
                            {/*  , invoice #{item.keyword}, {item.keyword}*/}
                            {/*</span>*/}
                          </a>
                        </div>
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          <span className="text-gray-900">{item.url}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
