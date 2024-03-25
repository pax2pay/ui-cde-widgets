import { Component, h, Prop } from "@stencil/core"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"

@Component({
	tag: "p2p-card-iframe",
	styleUrl: "style.css",
	scoped: true,
})
export class CardIframe {
	@Prop({ mutable: true }) token?: Card.Token | Error
	@Prop({ mutable: true }) cardHolderName?: string
	// when we're loading this from a card link, mpay will have already base64 encoded the card holders name
	// if the portal is displaying a card that its just created, it won't be encoded
	@Prop() nameAlreadyEncoded = false
	@Prop() buttons: boolean
	@Prop() width?: string = "600"
	@Prop() height?: string = "350"

	render() {
		return this.token
			? [
					<div>
						<p2p-card-display cardPart="pan" format="labelled" card={this.token}></p2p-card-display>
						<p2p-card-display cardPart="expires" format="labelled" card={this.token}></p2p-card-display>
						<p2p-card-display cardPart="csc" format="labelled" card={this.token}></p2p-card-display>
					</div>,
					<p2p-virtual-card
						card={this.token}
						cardHolderName={this.cardHolderName}
						nameAlreadyEncoded={this.nameAlreadyEncoded}
						id="iframe"
						width={this.width}
						height={this.height}></p2p-virtual-card>,
					this.buttons ? (
						<aside>
							<p2p-card-button
								task="print"
								card={this.token}
								cardHolderName={this.cardHolderName}
								nameAlreadyEncoded={this.nameAlreadyEncoded}></p2p-card-button>
							<p2p-card-button
								task="pdf"
								card={this.token}
								cardHolderName={this.cardHolderName}
								nameAlreadyEncoded={this.nameAlreadyEncoded}></p2p-card-button>
						</aside>
					) : (
						""
					),
			  ]
			: ""
	}
}
