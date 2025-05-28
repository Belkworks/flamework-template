import { OnStart, Service } from "@flamework/core";
import { OnJoin } from "./MetaService";
import { log } from "common/log";
import { createCollection } from "@rbxts/lapis";
import { PROD } from "common/env";
import { defaultData } from "server/store/data/types";
import { Players } from "@rbxts/services";
import { removePlayerData, setPlayerData } from "server/store/data/actions";
import { subscribe } from "@rbxts/charm";
import { selectProfile } from "server/store/data/selectors";
import { playerRemovingPromise } from "server/util/player";
import { playerDataAtom } from "server/store/data";
import { sharedPlayerData } from "common/atoms";
import { reduce } from "@rbxts/remap";

const collection = createCollection(PROD ? "player-data" : "dev-player-data", {
	defaultData: defaultData.profile,
});

@Service()
export class DataService implements OnJoin, OnStart {
	private async loadProfile(player: Player) {
		const document = await collection.load(`${player.UserId}`, [player.UserId]);

		if (!player.IsDescendantOf(Players))
			return document.close().catch(err => {
				log.Warn("failed to close document early for {name}: {err}", player.Name, err);
			});

		const unsubscribe = subscribe(
			() => selectProfile(player),
			(data, oldData) => {
				if (data && oldData) document.write(data);
			},
		);

		setPlayerData(player, {
			...defaultData,
			profile: {
				...defaultData.profile,
				...document.read(),
			},
		});

		document.beforeClose(() => {
			unsubscribe();
			removePlayerData(player);
			log.Debug("closed profile for {name}", player.Name);
		});

		playerRemovingPromise(player).then(() => document.close());
	}

	onJoin(player: Player) {
		this.loadProfile(player)
			.then(() => {
				log.Debug("loaded profile for {name}", player.Name);
			})
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
