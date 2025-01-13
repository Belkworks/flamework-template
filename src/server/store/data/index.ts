import { atom } from "@rbxts/charm";
import { PlayerData } from "./types";

export const playerDataAtom = atom(new ReadonlyMap<Player, PlayerData>());
