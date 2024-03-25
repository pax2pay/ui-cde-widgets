export type Message =
	| {
			status: "success"
			public: string
	  }
	| {
			status: "failed"
			reason?: string
	  }
export namespace Message {
	export function is(value: Message | any): value is Message {
		return (
			typeof value == "object" &&
			((value.status == "success" && typeof value.public == "string") ||
				(value.status == "failed" && (typeof value.reason == "string" || value.reason == undefined)))
		)
	}
}
