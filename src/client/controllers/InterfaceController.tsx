import { Controller, OnStart } from "@flamework/core";
import { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { App } from "client/interface/App";
import { AppContext, ContextController } from "./ContextController";
import React from "@rbxts/react";
import { PlayerGui } from "client/user";

@Controller()
export class InterfaceController implements OnStart {
	constructor(private context: ContextController) {}

	onStart() {
		createRoot(new Instance("Folder")).render(
			<StrictMode>
				<AppContext.Provider value={this.context.value}>{createPortal(<App />, PlayerGui)}</AppContext.Provider>
			</StrictMode>,
		);
	}
}
