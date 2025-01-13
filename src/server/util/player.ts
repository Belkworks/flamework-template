import { Players } from "@rbxts/services";

export const playerRemovingPromise = (player: Player) =>
	!player.IsDescendantOf(player)
		? Promise.resolve(player)
		: Promise.fromEvent(Players.PlayerRemoving, left => player === left);
