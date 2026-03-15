import * as drop from "@belkworks/drop";
import { PROD } from "common/env";
import { defaultData, PlayerProfile } from "server/store/data/types";

const schema = drop.schema(defaultData.profile);

export const playerDataStore = drop.store({
	name: PROD ? "data" : "dev-data",
	schema,
});

export const getKey = (player: Player) => tostring(player.UserId);

export const updateProfile = (player: Player, update: (profile: PlayerProfile) => PlayerProfile) =>
	drop.update(playerDataStore, getKey(player), update);

// TODO: make this return a promise
export const waitForSessionAsync = (player: Player) => {
	drop.waitforsession(playerDataStore, getKey(player));
};
