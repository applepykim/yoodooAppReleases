import axios from "axios";

export async function goingUpApi(dataList, myLogInList, signal) {
  const toUrl: string = process.env.NEXT_PUBLIC_BASEURL_DGMON_GOINGUP;
  const body = {
    dataList: dataList,
    myLogInList: myLogInList,
  };

  try {
    return await axios.post(toUrl, body, { signal });
  } catch (err) {
    console.error(err);
  }
}

export async function goingUpLoginApi(myLoginInfo, signal) {
  const toUrl: string = process.env.NEXT_PUBLIC_BASEURL_DGMON_GOINGUP_LOGIN;
  const body = {
    myLoginInfo: myLoginInfo,
  };

  try {
    return await axios.post(toUrl, body, { signal });
  } catch (err) {
    console.error(err);
  }
}

export async function goingUpSearchApi(myKeyword, signal) {
  const toUrl: string = process.env.NEXT_PUBLIC_BASEURL_DGMON_GOINGUP_SEARCH;
  const body = {
    myKeyword: myKeyword,
  };

  try {
    return await axios.post(toUrl, body, { signal });
  } catch (err) {
    console.error(err);
  }
}

export async function goingUpCloseBrowseApi(signal) {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL_GOINGUP_CLOSE_BROWSE;

  // const params = {
  //   keyword: `${keyword}`,
  // };

  const url = `${baseUrl}`;

  try {
    const result = await axios.get(url, { signal });
    return result.data;
  } catch (err) {
    console.error(err);
  }
}
