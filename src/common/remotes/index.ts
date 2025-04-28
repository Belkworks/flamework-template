import { createRemotes } from "@rbxts/remo";
import { atomRemotes } from "./namespaces/atoms";

export const remotes = createRemotes({
	atoms: atomRemotes,
});
