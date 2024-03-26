import { Component, ComponentWillLoad, h, Host, Prop, State, VNode } from "@stencil/core"
import { Error } from "gracely"
import { Card } from "@pax2pay/model-cde"
import { model } from "../../../model"

@Component({
	tag: "p2p-cde-card-display",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pCardDisplay implements ComponentWillLoad {
	@Prop() card?: Card.Token | Error
	@Prop() cardPart: "pan" | "csc" | "expires"
	@Prop() format?: "plain" | "labelled"
	@Prop() feature?: "copy"
	@State() url?: string

	componentWillLoad(): void {
		model.state.targets.listen("change", target => (this.url = target.url))
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
						allow={`clipboard-write ${this.url}`}
						src={`${this.url}/display/${this.card}/${this.cardPart}${this.format ? "?format=" + this.format : ""}`}
					/>
				)}
			</Host>
		)
	}
}
