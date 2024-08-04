import { Players } from "@rbxts/services";

export const User = Players.LocalPlayer;

export const PlayerGui = User.WaitForChild("PlayerGui") as PlayerGui;
