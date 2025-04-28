import { RunService } from "@rbxts/services";

export const FORCE_DEV = false;

export const PROD = !(RunService.IsStudio() || FORCE_DEV);
