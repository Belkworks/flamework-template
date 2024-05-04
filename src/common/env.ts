import { RunService } from "@rbxts/services";
import { FORCE_DEV } from "./config";

export const DEV = RunService.IsStudio() || FORCE_DEV;
