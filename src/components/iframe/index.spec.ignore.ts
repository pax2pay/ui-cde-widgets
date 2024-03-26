//import { CardIframe } from "./index"

/*
describe("test iframe", () => {
	const test = "4871872385/16/0922/220901/MXUi7bds0kSst7epF-0c4zn8ihbojp9TyzG5PUFwExW0Z7Li/ZLtvSGgzviuQKE6T61ggXQ"
	/*	it("get token", async () => {
		const page = await newSpecPage({
			components: [CardIframe],
			html: "<p2p-cde-card-iframe></p2p-cde-card-iframe>"
		})
		//await page.setContent("<p2p-cde-card-iframe></p2p-cde-card-iframe>")
		const element = page.body.querySelector("p2p-cde-card-iframe")
			//await page.find("p2p-cde-card-iframe")
		await element.setProperty("card", { pan: "1234567890", expires: [10, 22], csc: "999", lapses: "2022-10-01" })
		await page.waitForChanges()
		const token = await element.getProperty("token")
		expect(token).toEqual({})
	})
	it("token undefined", async () => {
		const page = await newSpecPage({
			components: [CardIframe],
			html: "<p2p-cde-card-iframe token='{test}'></p2p-cde-card-iframe>"
		})
		await page.waitForChanges()
		expect(page.token).toEqual(test)
/!*		const page = await newE2EPage()
		await page.setContent("<p2p-cde-card-iframe></p2p-cde-card-iframe>")
		const element = await page.find("p2p-cde-card-iframe")
		await element.setProperty("token", test)
		await page.waitForChanges()
		const token = await element.getProperty("token")*!/
		//expect(token).toEqual(test)
	})*/
/*
	it("second test", async () => {
		const cardIframe = new CardIframe()
		cardIframe.tokenizeCard = async c => {
			return test.toUpperCase()
		}
		cardIframe.token = test
		cardIframe.componentWillLoad()
		expect(cardIframe.card).toBeFalsy()
		expect(cardIframe.token).toEqual(test)
	})
})

	*/
