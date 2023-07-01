

function randomDuration(duration) {
	const min = parseInt(duration[0]);
	const max = parseInt(duration[1]);
	return Math.floor(Math.random() * (max - min + 1) + min)
}


export async function searchMySite({page, mySite, duration, count}) {
	let myUrl = mySite;
	if (mySite.includes("https://")) {
		myUrl = mySite.replace("https://", "");
	} else if (mySite.includes("http://")) {
		myUrl = mySite.replace("http://", "");
	}
	const links = await page.$$('a.link_source');
	let myDuration = randomDuration(duration)
	myDuration = myDuration * 1000
	let linkCount = 0
	for (const link of links) {
		linkCount++
		const href = await page.evaluate(el => el.href, link)
		if (href.includes(myUrl)) {
			await page.waitForTimeout(1000);
			await link.click();
			await page.waitForTimeout(3000);
			console.log("0")
			await page.evaluate(() => {
					console.log("1")
					document.documentElement.scrollTo(0, document.body.scrollHeight);
			})
			await page.waitForTimeout(3000);
			await page.evaluate(() => {
					console.log("2")
					document.documentElement.scrollTo(0, document.body.scrollHeight / 2);
			})
			console.log("3")
			await page.waitForTimeout(myDuration);
			return {mySiteCheck: true, count: linkCount + (count * 15), myDuration: myDuration};
		}
	}
	return {mySiteCheck: false, count: 0, myDuration: myDuration};
}