import { Flamework } from "@flamework/core";

// server
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/server/components");

// common
Flamework.addPaths("src/common/components");

// ignition
Flamework.ignite();
