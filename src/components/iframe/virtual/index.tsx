import { Component, h, Prop } from "@stencil/core"
import { cryptly } from "cryptly"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"
@Component({
	tag: "p2p-virtual-card",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pVirtualCard {
	@Prop({ mutable: true }) card?: Card.Token | Error
	@Prop({ mutable: true }) cardHolderName?: string
	// when we're loading this from a card link, mpay will have already base64 encoded the card holders name
	// if the portal is displaying a card that its just created, it won't be encoded
	@Prop() nameAlreadyEncoded = false
	@Prop() company?: string
	@Prop() width: string
	@Prop() height: string
	render() {
		return [
			<iframe
				width={this.width}
				height={this.height}
				frameBorder="0"
				scrolling="no"
				src={
					`${process.env.uiCdeUrl}/image/${this.card}` +
					(this.cardHolderName
						? !this.nameAlreadyEncoded
							? `?ch=${cryptly.Base64.encode(this.cardHolderName, "url")}`
							: `?ch=${this.cardHolderName}`
						: "")
				}></iframe>,
		]
	}
}
