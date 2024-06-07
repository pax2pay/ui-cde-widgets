import { isly } from "isly"

export interface Message {
	status: string
	public: string
}
export namespace Message {
	export const type = isly.object<Message>({
		status: isly.string(),
		public: isly.string(),
	})
	export const is = type.is
}
