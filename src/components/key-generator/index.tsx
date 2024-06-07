import { Component, Element, h, Host, Listen, Method, VNode } from "@stencil/core"
import { url } from "../url"
import { Message } from "./Message"

@Component({
	tag: "p2p-cde-key-generator",
	styleUrl: "style.css",
	scoped: true,
})
export class KeyGenerator {
	@Element() element: HTMLElement
	private resolve?: (value: string | PromiseLike<string | undefined> | undefined) => void
	private timeout?: any

	@Listen("message", { target: "window" })
	async handleMessage(event: MessageEvent): Promise<void> {
		console.log("message", event.data)
		if (event.origin == new URL(url.ui).origin && Message.is(event.data) && this.resolve) {
			this.resolve(event.data.public)
			this.resolve = undefined
			window.clearTimeout(this.timeout)
			this.timeout = undefined
		}
	}
	@Method()
	async generate(): Promise<string | undefined> {
		return new Promise(resolve => {
			this.resolve = resolve
			this.timeout = window.setTimeout(async () => {
				this.resolve?.(undefined)
				this.resolve = undefined
				this.timeout = undefined
			}, 3_000)
		})
	}
	render(): VNode | VNode[] {
		return (
			<Host>
				{window.location.href.includes(url.ui) ? (
					[]
				) : (
					<iframe frameBorder="0" scrolling="no" src={`${url.ui}/generate?parent=${window.location.origin}`} />
				)}
			</Host>
		)
	}
}
