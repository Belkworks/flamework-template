import { Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

export interface OnJoin {
	onJoin(player: Player): void;
}

export interface OnLeave {
	onLeave(player: Player): void;
}

export interface OnSpawn {
	onSpawn(player: Player, character: Model): void;
}

export interface OnDeath {
	onDeath(player: Player, character: Model): void;
}

export interface OnClose {
	onStop(): void | Promise<void>;
}

@Service()
export class MetaService implements OnStart {
	onStart() {
		// OnSpawn

		const spawnListeners = new Set<OnSpawn>();
		Modding.onListenerAdded<OnSpawn>(listener => spawnListeners.add(listener));
		Modding.onListenerRemoved<OnSpawn>(listener => spawnListeners.delete(listener));

		const fireSpawn = (player: Player, character: Model) => {
			for (const listener of spawnListeners) {
				task.spawn(() => listener.onSpawn(player, character));
			}
		};

		// OnDeath

		const deathListeners = new Set<OnDeath>();
		Modding.onListenerAdded<OnDeath>(listener => deathListeners.add(listener));
		Modding.onListenerRemoved<OnDeath>(listener => deathListeners.delete(listener));

		const fireDeath = (player: Player, character: Model) => {
			for (const listener of deathListeners) {
				task.spawn(() => listener.onDeath(player, character));
			}
		};

		// OnJoin, OnSpawn, OnDeath

		const joinListeners = new Set<OnJoin>();
		Modding.onListenerAdded<OnJoin>(listener => joinListeners.add(listener));
		Modding.onListenerRemoved<OnJoin>(listener => joinListeners.delete(listener));

		const onCharacter = (player: Player, character: Model) => {
			fireSpawn(player, character);
			const humanoid = character.FindFirstChildOfClass("Humanoid");
			if (!humanoid) return;
			humanoid.Died.Connect(() => fireDeath(player, character));
		};

		const fireJoin = (player: Player) => {
			for (const listener of joinListeners) task.spawn(() => listener.onJoin(player));
			player.CharacterAdded.Connect(char => onCharacter(player, char));
			if (player.Character) onCharacter(player, player.Character);
		};

		Players.PlayerAdded.Connect(fireJoin);
		Players.GetPlayers().forEach(fireJoin);

		// OnLeave

		const leaveListeners = new Set<OnLeave>();
		Modding.onListenerAdded<OnLeave>(listener => leaveListeners.add(listener));
		Modding.onListenerRemoved<OnLeave>(listener => leaveListeners.delete(listener));

		Players.PlayerRemoving.Connect(player => {
			for (const listener of leaveListeners) task.spawn(() => listener.onLeave(player));
		});

		// OnStop

		const stopListeners = new Set<OnClose>();
		Modding.onListenerAdded<OnClose>(listener => stopListeners.add(listener));
		Modding.onListenerRemoved<OnClose>(listener => stopListeners.delete(listener));

		game.BindToClose(() => {
			const promises = [];
			for (const listener of stopListeners) promises.push(listener.onStop());
			Promise.all(promises).await();
		});
	}
}
