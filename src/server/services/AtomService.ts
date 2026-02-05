import { Service } from "@flamework/core";
import * as atoms from "common/atoms";
import { remotes } from "common/remotes";
import { OnJoin, OnLeave } from "./MetaService";
import CharmSync from "@rbxts/charm-sync";
import { computed } from "@rbxts/charm";
import { playerDataAtom } from "server/store/data";

const syncRemote = remotes.atoms.sync;
const { server } = CharmSync;

server.connect((player, payloads) => syncRemote.fire(player, payloads));

@Service()
export class AtomService implements OnJoin, OnLeave {
	onJoin(player: Player) {
		server.addSignalsToClient(player, {
			playerData: computed(() => playerDataAtom().get(player)),
			...atoms,
		});
	}

	onLeave(player: Player) {
		server.removeClient(player);
	}
}
