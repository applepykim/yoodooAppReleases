async function ppClickNumber({page}) {
	let nowNumber
	const element = await page.$('.list_page a.pgn.now')
	console.log("element >>> " + element)

	if (element) {
		nowNumber = await page.evaluate(el => el.textContent, element);
		nowNumber = parseInt(nowNumber)
	}

	const aTags = await page.$$('a.pgn'); // 모든 a 태그 요소 가져오기
	for (const aTag of aTags) {
		let value = await page.evaluate((element) => element.innerText, aTag);
		value = parseInt(value)
		if (value === nowNumber + 1) {
			await aTag.click();
			break;
		}
	}
}

export async function moveNextPage({page}) {
	await page.waitForTimeout(1000);
	const result = await ppClickNumber({page: page}) // 현재 페이지를 계산해서 다음페이지로 이동하기
	await page.waitForTimeout(1000);
	return result
}
