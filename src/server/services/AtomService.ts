import { OnStart, Service } from "@flamework/core";
import CharmSync, { SyncPatch, SyncPayload } from "@rbxts/charm-sync";
import * as atoms from "common/atoms";
import { remotes } from "common/remotes";

const server = CharmSync.server({ atoms });
const syncRemote = remotes.atoms.sync;

const filterPayload = (player: Player, payload: SyncPayload<typeof atoms>): SyncPayload<typeof atoms> | undefined => {
	if (payload.type === "init")
		return {
			type: "init",
			data: {
				...payload.data,
				sharedPlayerData: {
					[player.Name]: payload.data.sharedPlayerData.get(player.Name),
				} as unknown as ReturnType<typeof atoms.sharedPlayerData>,
			},
		};

	const playerPatch = payload.data.sharedPlayerData?.get(player.Name);
	const data = {
		...payload.data,
		sharedPlayerData: playerPatch
			? ({ [player.Name]: playerPatch } as unknown as SyncPatch<ReturnType<typeof atoms.sharedPlayerData>>)
			: undefined,
	};

	if (!next(data)[0]) return;

	return {
		type: "patch",
		data,
	};
};

@Service()
export class AtomService implements OnStart {
	onStart() {
		server.connect((player, payload) => {
			const filtered = filterPayload(player, payload);
			if (filtered) syncRemote.fire(player, filtered);
		});

		remotes.atoms.init.connect(player => server.hydrate(player));
	}
}
