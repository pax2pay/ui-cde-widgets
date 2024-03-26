import { Targets as StateTargets } from "./Targets"

export class State {
	readonly targets: StateTargets
	private constructor(local: boolean) {
		this.targets = StateTargets.create(local)
	}
	static create(): State {
		const url = new URL(window.location.href)
		return new this(
			url.host.startsWith("localhost") || url.host.startsWith("127.0.0.1") || url.host.startsWith("192.168.")
		)
	}
}
export const state = State.create()
export namespace State {
	export import Targets = StateTargets
}
