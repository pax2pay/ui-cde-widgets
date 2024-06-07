import { Component, ComponentWillLoad, h, Host, Prop, VNode } from "@stencil/core"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"
import { url } from "../url"

@Component({
	tag: "p2p-cde-display",
	styleUrl: "style.css",
	scoped: true,
})
export class Display implements ComponentWillLoad {
	@Prop() card?: Card.Token | Error
	@Prop() cardPart: "pan" | "csc" | "expires"
	@Prop() format?: "plain" | "labelled"
	@Prop() feature?: "copy"

	componentWillLoad(): void {
		// model.state.targets.listen("change", target => (this.url = target.url))
	}

	render(): VNode | VNode[] {
		return (
			<Host>
				{window.location.href.includes(url) ? (
					[]
				) : (
					<iframe
						frameBorder="0"
						scrolling="no"
						allow={`clipboard-write ${url}`}
						src={`${url}/display/${this.card}/${this.cardPart}${this.format ? "?format=" + this.format : ""}`}
					/>
				)}
			</Host>
		)
	}
}
