import { atom } from "@rbxts/charm";
import { SharedPlayerData } from "./types/data";

export const sharedPlayerData = atom(new ReadonlyMap<Player["Name"], SharedPlayerData>());
