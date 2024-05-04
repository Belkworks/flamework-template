import Log, { Logger, LogLevel } from "@rbxts/log";
import { RunService } from "@rbxts/services";
import { DEV } from "./env";

export const log = Logger.configure()
	.SetMinLogLevel(DEV ? LogLevel.Verbose : LogLevel.Information)
	.WriteTo(Log.RobloxOutput({ TagFormat: "full" }))
	.Create();

if (DEV && RunService.IsServer()) Log.Warn("Running in development mode!");
