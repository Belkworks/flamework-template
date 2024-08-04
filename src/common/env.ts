import { RunService } from "@rbxts/services";

export const STUDIO = RunService.IsStudio();
export const PROD = STUDIO === false;
