import { Component, h, Host } from "@stencil/core"

@Component({
	tag: "p2p-cde-demo",
	styleUrl: "style.css",
	shadow: true,
})
export class CdeDemo {
	render() {
		return (
			<Host>
				<h1>Pax2Pay CDE Demo</h1>
				<p2p-2p-cde-display></p2p-2p-cde-display>
			</Host>
		)
	}
}
