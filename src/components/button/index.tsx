import { Component, h, Host, Prop, VNode } from "@stencil/core"
import { cryptly } from "cryptly"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"
import { url } from "../url"

@Component({
	tag: "p2p-cde-button",
	styleUrl: "style.css",
	scoped: true,
})
export class Button {
	@Prop() task: "print" | "pdf"
	@Prop({ mutable: true }) card?: Card.Token | Error
	@Prop({ mutable: true }) holder?: string
	// when we're loading this from a card link, mpay will have already base64 encoded the card holders name
	// if the portal is displaying a card that its just created, it won't be encoded
	@Prop() nameAlreadyEncoded = false

	render(): VNode | VNode[] {
		return (
			<Host>
				{window.location.href.includes(url.ui) ? (
					[]
				) : (
					<iframe
						frameBorder="0"
						scrolling="no"
						src={
							`${url.ui}/${this.task}/${this.card}` +
							(this.holder
								? !this.nameAlreadyEncoded
									? `?ch=${cryptly.Base64.encode(this.holder, "url")}`
									: `?ch=${this.holder}`
								: "")
						}
					/>
				)}
			</Host>
		)
	}
}
