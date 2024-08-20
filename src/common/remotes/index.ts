import { createRemotes } from "@rbxts/remo";
import { atomRemotes as atoms } from "./namespaces/atoms";

export const remotes = createRemotes({
	atoms,
});
