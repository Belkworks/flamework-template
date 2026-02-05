import { signal } from "@rbxts/charm";
import type { PlayerData } from "server/store/data/types";

export const [selectData, setData] = signal<PlayerData>();
