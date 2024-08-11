import { SyncPayload } from "@rbxts/charm";
import { Client, namespace, remote, Server } from "@rbxts/remo";

export const atomRemotes = namespace({
	sync: remote<Client, [payload: SyncPayload<typeof import("common/atoms")>]>(),
	init: remote<Server>(),
});
