export class Targets {
	private urls: { [name in Targets.Environment]: string } = {
		local: "http://localhost:3334",
		development: "https://cde.pax2pay.dev",
		production: "https://cde.pax2pay.com",
	}
	private environment: Targets.Environment
	private subscribers: Targets.Subscribers = {}
	private constructor(local: boolean) {
		this.environment = !local ? "production" : "development"
	}
	get(): Targets.Target {
		return { environment: this.environment, url: this.urls[this.environment] }
	}
	change(environment: Targets.Environment, url?: string): void {
		if (url)
			this.urls[environment] = url
		this.environment = environment
		this.subscribers.change?.forEach(callback => callback(this.get()))
	}
	listen<T extends keyof Targets.Events>(
		event: T,
		callback: Targets.Events[T],
		options?: { lazy: boolean }
	): Targets.Target {
		this.subscribers[event]?.push(callback) ?? (this.subscribers[event] = [callback])
		options?.lazy !== true && this.subscribers[event]?.forEach(callback => callback(this.get()))
		return this.get()
	}
	static create(local: boolean): Targets {
		return new this(local)
	}
}
export namespace Targets {
	export type Environment = "local" | "development" | "production"
	export type Target = { [environment in Environment]: { environment: environment; url: string } }[Environment]
	export interface Events {
		change: (target: Target) => unknown
	}
	export type Subscribers = { [event in keyof Events]?: Events[event][] }
}
