import { SyncPayload } from "@rbxts/charm-sync";
import { Client, namespace, remote, Server } from "@rbxts/remo";

export const atomRemotes = namespace({
	// Events
	sync: remote<Client, [payload: SyncPayload<typeof import("common/atoms")>]>(),
	init: remote<Server>(),
});
