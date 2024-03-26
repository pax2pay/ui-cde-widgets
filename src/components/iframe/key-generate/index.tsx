import { Component, ComponentWillLoad, Element, h, Host, Listen, Method, Prop, State, VNode } from "@stencil/core"
import { model } from "../../../model"
import { Message } from "./Message"

@Component({
	tag: "p2p-cde-card-key-generate",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pCardKeyGenerate implements ComponentWillLoad {
	@Element() element: HTMLElement
	@Prop() parent?: string
	@State() url?: string
	private resolve?: (message: Message) => void
	private timer?: number

	componentWillLoad(): void {
		model.state.targets.listen("change", target => (this.url = target.url))
	}

	@Listen("message", { target: "window" })
	async handleMessage(event: MessageEvent): Promise<void> {
		if (event.origin == new URL(process.env.uiCdeUrl ?? "").origin) {
			this.resolve?.(Message.is(event.data) ? event.data : { status: "failed", reason: "Invalid message" })
			this.parent = undefined
			window.clearTimeout(this.timer)
		}
	}
	@Method()
	async generate(): Promise<Message> {
		//load this component behind the view, so don't show any error msg if it failed to load
		this.timer = window.setTimeout(() => this.resolve?.({ status: "failed" }), 3000)
		return new Promise(resolve => (this.resolve = resolve))
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
						src={`${this.url}/generate${this.parent ? "?parent=" + this.parent : ""}`}
					/>
				)}
			</Host>
		)
	}
}
