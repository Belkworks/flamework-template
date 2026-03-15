import { OnStart, Service } from "@flamework/core";
import { OnJoin } from "./MetaService";
import { log } from "common/log";
import { defaultData } from "server/store/data/types";
import { Players } from "@rbxts/services";
import { removePlayerData, setPlayerData } from "server/store/data/actions";
import { subscribe } from "@rbxts/charm";
import { playerRemovingPromise } from "server/util/player";
import { playerDataAtom } from "server/store/data";
import { sharedPlayerData } from "common/atoms";
import { reduce } from "@rbxts/remap";
import * as drop from "@belkworks/drop";
import { getKey, playerDataStore, waitForSessionAsync } from "server/drop/playerData";

@Service()
export class DataService implements OnJoin, OnStart {
	private async loadProfile(player: Player) {
		const key = getKey(player);

		drop.startsession(playerDataStore, key);
		waitForSessionAsync(player);

		if (!player.IsDescendantOf(Players)) {
			task.spawn(drop.stopsessionasync, playerDataStore, key);
			return;
		}

		setPlayerData(player, {
			...defaultData,
			profile: {
				...defaultData.profile,
				...drop.view(playerDataStore, key),
			},
		});

		playerRemovingPromise(player).then(() => {
			log.Verbose("closing profile for {name}", player.Name);
			removePlayerData(player);
			drop.stopsessionasync(playerDataStore, key);
			log.Debug("closed profile for {name}", player.Name);
		});
	}

	onJoin(player: Player) {
		log.Verbose("loading profile for {name}", player.Name);
		this.loadProfile(player)
			.then(() => log.Debug("loaded profile for {name}", player.Name))
			.catch(err => {
				player.Kick("Failed to load your data, please rejoin!");
				log.Warn("failed to load profile for {name}: {err}", player.Name, err);
			});
	}

	onStart() {
		subscribe(
			() => reduce(playerDataAtom(), (map, data, player) => map.set(player.Name, data), new Map()),
			sharedPlayerData,
		);
	}
}
