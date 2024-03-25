import { Component, h } from "@stencil/core"

@Component({
	tag: "p2p-card-input",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pCardInput {
	render() {
		return [
			<iframe width="100%" height="200" frameBorder="0" scrolling="no" src={`${process.env.uiCdeUrl}/input`}></iframe>,
		]
	}
}
