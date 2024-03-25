import { Component, h, Listen, Method, Prop } from "@stencil/core"
import { Message } from "./Message"

@Component({
	tag: "p2p-card-key-generate",
	styleUrl: "style.css",
	scoped: true,
})
export class P2pCardKeyGenerate {
	timer: NodeJS.Timeout
	element: HTMLIFrameElement
	private resolve?: (message: Message) => void
	@Prop() parent?: string

	@Listen("message", { target: "window" })
	async handleMessage(event: MessageEvent) {
		if (event.origin == new URL(process.env.uiCdeUrl ?? "").origin) {
			if (Message.is(event.data))
				this.resolve?.(event.data)
			else
				this.resolve?.({ status: "failed", reason: "Invalid message" })
			this.parent = undefined
			clearTimeout(this.timer)
		}
	}
	@Method()
	generate(): Promise<Message> {
		//load this component behind the view, so don't show any error msg if it failed to load
		this.timer = setTimeout(() => {
			this.resolve?.({ status: "failed" })
		}, 3000)
		return new Promise(resolve => {
			this.resolve = resolve
		})
	}

	render() {
		return [
			<iframe
				ref={(el: HTMLIFrameElement) => (this.element = el)}
				width="0"
				height="0"
				frameBorder="0"
				scrolling="no"
				src={`${process.env.uiCdeUrl}/generate${this.parent ? "?parent=" + this.parent : ""}`}></iframe>,
		]
	}
}
