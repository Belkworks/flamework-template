import { Controller, OnStart } from "@flamework/core";
import CharmSync from "@rbxts/charm-sync";
import { setData } from "client/store/data";
import { User } from "client/user";
import * as atoms from "common/atoms";
import { remotes } from "common/remotes";

const { client } = CharmSync;

@Controller()
export class AtomController implements OnStart {
	onStart() {
		client.addSignals({
			[`player-${User.UserId}`]: setData,
			...atoms,
		});

		remotes.atoms.sync.connect(payloads => client.patch(payloads));
	}
}
