import { State as ModelState, state as modelState } from "./State"

export namespace model {
	export import State = ModelState
	export const state = modelState
}
