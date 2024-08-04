import Log, { Logger, LogLevel } from "@rbxts/log";
import { PROD } from "./env";

export const log = Logger.configure()
	.SetMinLogLevel(PROD ? LogLevel.Information : LogLevel.Debugging)
	.WriteTo(Log.RobloxOutput({ TagFormat: "full" }))
	.Create();
