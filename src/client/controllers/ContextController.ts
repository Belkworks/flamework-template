import { Controller } from "@flamework/core";
import { createContext } from "@rbxts/react";

export const AppContext = createContext({} as ContextController);

@Controller()
export class ContextController {
	constructor() {}
}
