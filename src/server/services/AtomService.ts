import { OnStart, Service } from "@flamework/core";
import CharmSync from "@rbxts/charm-sync";
import * as atoms from "common/atoms";
import { remotes } from "common/remotes";

const server = CharmSync.server({ atoms });

@Service()
export class AtomService implements OnStart {
	onStart() {
		const syncRemote = remotes.atoms.sync;
		server.connect((player, payload) => syncRemote.fire(player, payload));

		remotes.atoms.init.connect(player => server.hydrate(player));
	}
}
