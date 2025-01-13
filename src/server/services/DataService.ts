import { OnStart } from "@flamework/core";
import { OnJoin } from "./MetaService";
import { log } from "common/log";
import { createCollection } from "@rbxts/lapis";
import { PROD } from "common/env";
import { defaultData, PlayerData } from "server/store/data/types";
import { Players } from "@rbxts/services";
import { removePlayerData, setPlayerData } from "server/store/data/actions";
import { observe, subscribe } from "@rbxts/charm";
import { selectData, selectProfile } from "server/store/data/selectors";
import { playerRemovingPromise } from "server/util/player";
import { playerDataAtom } from "server/store/data";
import { sharedPlayerData } from "common/atoms";
import { set } from "@rbxts/remap";

const collection = createCollection(PROD ? "player-data" : "dev-player-data", {
	defaultData: defaultData.profile,
});

export class DataService implements OnJoin, OnStart {
	private async loadProfile(player: Player) {
		const document = await collection.load(`${player.UserId}`, [player.UserId]);

		if (!player.IsDescendantOf(Players))
			return document.close().catch(err => {
				log.Warn("failed to close document early for {name}: {err}", player.Name, err);
			});

		const unsubscribe = subscribe(
			() => selectProfile(player),
			data => {
				if (data !== undefined) document.write(data);
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
		observe(playerDataAtom, (firstState, player) => {
			const update = (data?: PlayerData) => {
				sharedPlayerData(state => set(state, player.Name, data!));
			};

			update(firstState);

			return subscribe(() => selectData(player), update);
		});
	}
}
