import { Controller, OnStart } from "@flamework/core";
import { sync } from "@rbxts/charm";
import * as atoms from "common/atoms";
import { remotes } from "common/remotes";

const client = sync.client({ atoms });

@Controller()
export class AtomController implements OnStart {
	onStart() {
		remotes.atoms.sync.connect(payload => client.sync(payload));
		remotes.atoms.init.fire();
	}
}
