import { Controller, OnStart } from "@flamework/core";
import CharmSync from "@rbxts/charm-sync";
import { setData } from "client/store/data";
import * as atoms from "common/atoms";
import { remotes } from "common/remotes";

const { client } = CharmSync;

@Controller()
export class AtomController implements OnStart {
	onStart() {
		client.addSignals({
			playerData: setData,
			...atoms,
		});

		remotes.atoms.sync.connect(payloads => client.patch(payloads));
	}
}
