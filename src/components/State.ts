import { pax2pay } from "@pax2pay/model-cde"

export class State {
	private constructor(private readonly parent: string) {}
	async generate(): Promise<string | undefined> {
		const keys = await pax2pay.cde.Key.generate()
		
	}
	static create(parent: string) {
		return new State(parent)
	}
}
