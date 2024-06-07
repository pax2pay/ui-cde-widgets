import { Component, h, Host, Prop, VNode } from "@stencil/core"
import { Error } from "gracely"
import { pax2pay } from "@pax2pay/model-cde"
import { url } from "../url"

@Component({
	tag: "p2p-cde-display",
	styleUrl: "style.css",
	scoped: true,
})
export class Display {
	@Prop() card?: pax2pay.cde.Card.Token | Error
	@Prop() property: "pan" | "csc" | "expires" = "pan"
	@Prop() labelled?: boolean
	@Prop() feature?: "copy"

	render(): VNode | VNode[] {
		return (
			<Host>
				{window.location.href.includes(url.ui) ? (
					[]
				) : (
					<iframe
						frameBorder="0"
						scrolling="no"
						allow={`clipboard-write ${url.ui}`}
						src={`${url.ui}/display/${this.card}/${this.property}${this.labelled ? "?format=labelled" : ""}`}
					/>
				)}
			</Host>
		)
	}
}
