import { Component, ComponentWillLoad, Element, h, Host, Listen, Method, VNode } from "@stencil/core"
import { url } from "../url"
import { Message } from "./Message"

@Component({
	tag: "p2p-cde-key-generate",
	styleUrl: "style.css",
	scoped: true,
})
export class KeyGenerate implements ComponentWillLoad {
	@Element() element: HTMLElement
	private resolve?: (message: string | false) => void
	private promise?: Promise<string | false>

	componentWillLoad(): void {
		this.promise = new Promise<string | false>(resolve => (this.resolve = resolve))
	}

	@Listen("message", { target: "window" })
	async handleMessage(event: MessageEvent): Promise<void> {
		this.resolve?.(event.origin == new URL(url ?? "").origin && Message.is(event.data) ? event.data.public : false)
		this.resolve = undefined
	}

	@Method()
	async getPublicKey(): Promise<string | false> {
		return new Promise(resolve =>
			(async () => {
				const timeout = window.setTimeout(async () => resolve(false), 3_000)
				const result = (await this.promise) || false
				window.clearTimeout(timeout)
				resolve(result)
			})()
		)
	}

	render(): VNode | VNode[] {
		return (
			<Host>
				{window.location.href.includes(url) ? (
					[]
				) : (
					<iframe frameBorder="0" scrolling="no" src={`${url}/generate?parent=${window.location.origin}`} />
				)}
			</Host>
		)
	}
}
