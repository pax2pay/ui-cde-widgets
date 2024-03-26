import { Component, ComponentWillLoad, h, Host, State, VNode } from "@stencil/core"
import { state } from "../../../model/State"

@Component({
	tag: "p2p-cde-card-input",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pCardInput implements ComponentWillLoad {
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
					<iframe frameBorder="0" scrolling="no" src={`${this.url}/input`} />
				)}
			</Host>
		)
	}
}
