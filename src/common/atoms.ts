import { atom } from "@rbxts/charm";
import type { PlayerData } from "server/store/data/types";

export const sharedPlayerData = atom(new ReadonlyMap<Player["Name"], PlayerData>());
