import { SyncPayload } from "@rbxts/charm-sync";
import { Client, namespace, remote, Server } from "@rbxts/remo";

export const atomRemotes = namespace({
	sync: remote<Client, [payload: SyncPayload[]]>(),
});
