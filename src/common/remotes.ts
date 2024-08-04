import { SyncPayload } from "@rbxts/charm";
import { Client, createRemotes, namespace, remote, Server } from "@rbxts/remo";

export const remotes = createRemotes({
	atoms: namespace({
		sync: remote<Client, [payload: SyncPayload<typeof import("common/atoms")>]>(),
		init: remote<Server>(),
	}),
});
