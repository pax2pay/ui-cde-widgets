import { Component, h, Host, VNode } from "@stencil/core"
import { url } from "../url"

@Component({
	tag: "p2p-cde-input",
	styleUrl: "style.css",
	scoped: true,
})
export class Input {
	render(): VNode | VNode[] {
		return (
			<Host>
				{window.location.href.includes(url) ? [] : <iframe frameBorder="0" scrolling="no" src={`${url}/input`} />}
			</Host>
		)
	}
}
