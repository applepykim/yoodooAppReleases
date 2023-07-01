import {puppeteerBrowser} from '../index.mjs'

export async function naverLogin({id = "id", pw = "pw"}) {
	const url = "https://nid.naver.com/nidlogin.login?svctype=262144"
	const {page, browser} = await puppeteerBrowser(url)

	const naver_id = id
	const naver_pw = pw


	await page.evaluate((id, pw) => {
		const idInput = document.querySelector('#id');
		const pwInput = document.querySelector('#pw');

		idInput.value = id;
		pwInput.value = pw;

	}, naver_id, naver_pw);
	await page.waitForTimeout(3000);
	await page.click("#upper_login_btn");
	await page.waitForTimeout(2000);
	const errorMessage = await page.$('#error_message')
	const errorMessage2 = await page.$('#title_msg')
	if (errorMessage) {
		const text = await page.evaluate(element => element.textContent, errorMessage);
		if (text.includes("비밀번호를 잘못")) return {browser, page, errorMessage: "비밀번호를 잘못", errorMessage2: "정상"}
	}
	if (errorMessage2) {
		const text2 = await page.evaluate(element => element.textContent, errorMessage2);
		if (text2.includes("비밀번호 또는")) return {browser, page, errorMessage: "정상", errorMessage2: "비밀번호 또는"}
	}

	return {page, browser, errorMessage: "정상", errorMessage2: "정상"}
}


// void naverLogin({id: "applepykim", pw: "!k06910561K"})