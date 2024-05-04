import { Flamework } from "@flamework/core";

// client
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/components");

// common
Flamework.addPaths("src/common/components");

// ignition
Flamework.ignite();
