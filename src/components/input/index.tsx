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
				{window.location.href.includes(url.ui) ? [] : <iframe frameBorder="0" scrolling="no" src={`${url.ui}/input`} />}
			</Host>
		)
	}
}
