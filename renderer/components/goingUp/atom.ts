import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: local } = recoilPersist({
  key: `atomLocal`,
});

export const ADataList = atom({
  key: `goingup_dataList`,
  default: [],
  effects_UNSTABLE: [local],
});

export const AMyLogInList = atom({
  key: `goingup_myLogInList`,
  default: [],
  effects_UNSTABLE: [local],
});

export const AIsStarting = atom({
  key: `goingup_isStarting`,
  default: false,
  effects_UNSTABLE: [local],
});

export const AMyKeywordAllLists = atom({
  key: `goingup_myKeywordAllLists`,
  default: [],
  effects_UNSTABLE: [local],
});
