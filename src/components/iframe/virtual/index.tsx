import { Component, ComponentWillLoad, h, Host, Prop, State, VNode } from "@stencil/core"
import { cryptly } from "cryptly"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"
import { state } from "../../../model/State"

@Component({
	tag: "p2p-cde-virtual-card",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pVirtualCard implements ComponentWillLoad {
	@Prop({ mutable: true }) card?: Card.Token | Error
	@Prop({ mutable: true }) cardHolderName?: string
	// when we're loading this from a card link, mpay will have already base64 encoded the card holders name
	// if the portal is displaying a card that its just created, it won't be encoded
	@Prop() nameAlreadyEncoded = false
	@Prop() company?: string
	@State() url?: string

	componentWillLoad(): void {
		state.targets.listen("change", target => (this.url = target.url))
	}

	render(): VNode | VNode[] {
		return (
			<Host>
				{!this.url || window.location.href.includes(this.url) ? (
					[]
				) : (
					<iframe
						frameBorder="0"
						scrolling="no"
						src={
							`${this.url}/image/${this.card}` +
							(this.cardHolderName
								? !this.nameAlreadyEncoded
									? `?ch=${cryptly.Base64.encode(this.cardHolderName, "url")}`
									: `?ch=${this.cardHolderName}`
								: "")
						}
					/>
				)}
			</Host>
		)
	}
}
