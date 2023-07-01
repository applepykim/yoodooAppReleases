
export async function keywordSearch({page, myKeyword = "양양펜션"}) {
	if (myKeyword === "양양펜션") return;
	await page.goto('https://m.naver.com/')
	await page.waitForTimeout(1000);
	await page.type('#query', myKeyword);
	await page.waitForTimeout(1000);
	await page.click('.sch_btn_search');
}