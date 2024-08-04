import { Controller } from "@flamework/core";
import { createContext } from "@rbxts/react";

type AppContext = object;

export const AppContext = createContext({} as AppContext);

@Controller()
export class ContextController {
	readonly value: AppContext;

	constructor() {
		this.value = {};
	}
}
