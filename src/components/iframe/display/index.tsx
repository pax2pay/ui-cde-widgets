import { Component, h, Prop } from "@stencil/core"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"

@Component({
	tag: "p2p-card-display",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pCardDisplay {
	@Prop() card?: Card.Token | Error
	@Prop() cardPart: "pan" | "csc" | "expires"
	@Prop() format?: "plain" | "labelled"
	@Prop() feature?: "copy"
	render() {
		return (
			<iframe
				width="100%"
				height="51"
				frameBorder="0"
				scrolling="no"
				allow={`clipboard-write ${process.env.uiCdeUrl}`}
				src={`${process.env.uiCdeUrl}/display/${this.card}/${this.cardPart}${
					this.format ? "?format=" + this.format : ""
				}`}></iframe>
		)
	}
}
