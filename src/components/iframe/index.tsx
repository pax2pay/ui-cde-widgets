import { Component, Fragment, h, Host, Prop, VNode } from "@stencil/core"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"

@Component({
	tag: "p2p-cde-card-iframe",
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

	render(): VNode | VNode[] {
		return (
			<Host>
				{this.token ? (
					<Fragment>
						<div>
							<p2p-cde-card-display cardPart="pan" format="labelled" card={this.token}></p2p-cde-card-display>
							<p2p-cde-card-display cardPart="expires" format="labelled" card={this.token}></p2p-cde-card-display>
							<p2p-cde-card-display cardPart="csc" format="labelled" card={this.token}></p2p-cde-card-display>
						</div>
						<p2p-cde-virtual-card
							card={this.token}
							cardHolderName={this.cardHolderName}
							nameAlreadyEncoded={this.nameAlreadyEncoded}></p2p-cde-virtual-card>
						{this.buttons ? (
							<div>
								<p2p-cde-card-button
									task="print"
									card={this.token}
									cardHolderName={this.cardHolderName}
									nameAlreadyEncoded={this.nameAlreadyEncoded}></p2p-cde-card-button>
								<p2p-cde-card-button
									task="pdf"
									card={this.token}
									cardHolderName={this.cardHolderName}
									nameAlreadyEncoded={this.nameAlreadyEncoded}></p2p-cde-card-button>
							</div>
						) : (
							[]
						)}
					</Fragment>
				) : (
					[]
				)}
			</Host>
		)
	}
}
