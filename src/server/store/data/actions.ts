import { change, deleteKey, set } from "@rbxts/remap";
import { playerDataAtom } from ".";
import { PlayerData, PlayerProfile } from "./types";

export const setPlayerData = (player: Player, data: PlayerData) => playerDataAtom(state => set(state, player, data));

export const removePlayerData = (player: Player) => playerDataAtom(state => deleteKey(state, player));

export const updateData = (player: Player, updater: (data: PlayerData) => PlayerData) =>
	playerDataAtom(state => change(state, player, updater));

export const updateProfile = (player: Player, updater: (profile: PlayerProfile) => PlayerProfile) =>
	updateData(player, data => change(data, "profile", updater));
