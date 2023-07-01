import {naverLogin} from './naverLogin/index.mjs';
import {keywordSearch} from './keywordSearch/index.mjs'
import {searchMySite} from './searchMySite/index.mjs'
import {moveNextPage} from './moveNextPage/index.mjs'
import puppeteer from "puppeteer";
import path from 'node:path'
import * as os from 'node:os'

let myBrowser;
let myPage
let mySiteCheck = false;
const myLoginInfo = {id: "applepykim", pw: "!k06910561K"};

const myKeyword = {
	keyword: '태아보험',
	duration: [15, 15],
	url: "https://twitter.com/babyinsurrance",
	title: "현대해상태아보험 | 트위터"
};
const myKeyword2 = {
	keyword: '다이렉트자동차운전자보험비교사이트 싹뚝',
	duration: [15, 15],
	url: "ssagttug.com",
	title: "다이렉트자동차운전자보험비교사이트 싹뚝"
};

export async function puppeteerBrowser(url = "https://naver.com") {

	const chromiumPath = path.join(
		os.homedir(),
		'AppData',
		'Local',
		'Chromium',
		'Application',
		'chrome.exe'
	);

	const browser = await puppeteer.launch({
		headless: false,

		ignoreDefaultArgs: ['--disable-extensions'],
		// executablePath: '/snap/bin/chromium', // 리눅스
		// executablePath: chromePath, // 윈도우
		// executablePath: 'C:\\Users\\max\\AppData\\Local\\Chromium\\Application\\chrome.exe',
		// executablePath: 'C:\\Users\\ncn2\\AppData\\Local\\Chromium\\Application\\chrome.exe',
		// executablePath: 'C:\\Users\\당근\\AppData\\Local\\Chromium\\Application\\chrome.exe',
		// executablePath: 'C:\\Users\\mktre\\AppData\\Local\\Chromium\\Application\\chrome.exe',
		// executablePath: 'C:\\Users\\ncn_fractal\\AppData\\Local\\Chromium\\Application\\chrome.exe',
		// executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 구글크롬경로
		// executablePath: chromiumPath, // 구글크롬경로
	})

	const pages = await browser.pages();
	for (const page of pages) {
		console.log(page)
		await page.close();
	}

	const page = await browser.newPage();

	// 알림 권한 블록
	await page.evaluateOnNewDocument(() => {
		// Notification.permission을 'denied'로 설정하여 알림 권한 요청을 차단
		Object.defineProperty(window, 'Notification', {
			value: class MockNotification {
				constructor() {
					this.permission = 'denied';
				}
			},
			writable: false,
			configurable: false,
			enumerable: true,
		});
	});
	await page.setUserAgent('Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36')
	await page.setViewport({ width: 1000, height: 1500 });
	await page.goto(url);
	return {browser: browser, page: page}
}


// void await goingUpLogin(myLoginInfo);
// void await goingUpSearch(myKeyword);
// void await goingUpSearch(myKeyword2);
// void await goingUpCloseBrowse();