import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core"
import { gracely } from "gracely"
import { smoothly } from "smoothly"
import { pax2pay } from "../../pax2pay"
import { url } from "../url"

@Component({
	tag: "p2p-cde-demo",
	styleUrl: "style.css",
	shadow: true,
})
export class CdeDemo {
	@Prop({ mutable: true }) card?: pax2pay.Card | string
	@State() token: string | undefined
	private inputElement?: HTMLElement
	private generatorElement?: HTMLP2pCdeKeyGeneratorElement
	private client = pax2pay.Client.Card.create(url.api + "/")
	@Event() smoothlyNotify: EventEmitter<smoothly.Notice>

	private raise<T>(response: T | gracely.Error): T | undefined {
		const result = gracely.Error.is(response)
		if (result)
			this.smoothlyNotify.emit(smoothly.Notice.failed(JSON.stringify(response, undefined, "  ")))
		return result ? undefined : response
	}

	render() {
		this.card = parse(this.card) ?? { pan: "5454545454545454", csc: "987", expires: [2, 25] }
		return (
			<Host>
				<h1>Pax2Pay CDE Demo</h1>
				<smoothly-form
					onSmoothlyFormSubmit={async () => {
						this.card = (this.inputElement && parse(this.inputElement.innerText)) ?? this.card
						console.log("card", this.card)
						const key = this.generatorElement && (await this.generatorElement.generate())
						console.log("key", key)
						if (pax2pay.Card.is(this.card) && key)
							this.token = this.raise(await tokenize(this.client.card, this.card, key))
					}}>
					<pre>
						<code contentEditable ref={element => (this.inputElement = element)}>
							{JSON.stringify(this.card, undefined, "  ")}
						</code>
					</pre>
					<p2p-cde-key-generator ref={element => (this.generatorElement = element)}></p2p-cde-key-generator>
					<smoothly-submit>generate</smoothly-submit>
				</smoothly-form>
				{this.token && (
					<section>
						<smoothly-form>
							<smoothly-input value={this.token}>Token</smoothly-input>
						</smoothly-form>
						<p2p-cde-display card={this.token} property="pan" labelled></p2p-cde-display>
						<p2p-cde-display card={this.token} property="csc" labelled></p2p-cde-display>
						<p2p-cde-display card={this.token} property="expires" labelled></p2p-cde-display>
					</section>
				)}
			</Host>
		)
	}
}
function parse(card: pax2pay.Card | string | undefined): pax2pay.Card | undefined {
	const result = typeof card == "string" ? JSON.parse(card) : card
	return pax2pay.Card.is(result) ? result : undefined
}

async function tokenize(
	client: pax2pay.Client.Card,
	card: pax2pay.Card,
	key?: string
): Promise<pax2pay.Card.Token | gracely.Error> {
	return await client.post<pax2pay.Card.Token>("card", card, key ? { cdePublicKey: key } : undefined)
}
