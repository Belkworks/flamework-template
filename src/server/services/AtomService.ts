import { OnStart, Service } from "@flamework/core";
import { sync } from "@rbxts/charm";
import * as atoms from "common/atoms";
import { remotes } from "common/remotes";

const server = sync.server({ atoms });

@Service()
export class AtomService implements OnStart {
	onStart() {
		const syncRemote = remotes.atoms.sync;
		server.connect((player, payload) => syncRemote.fire(player, payload));

		remotes.atoms.init.connect(player => server.hydrate(player));
	}
}
