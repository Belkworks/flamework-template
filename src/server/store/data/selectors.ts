import { playerDataAtom } from ".";

export const selectData = (player: Player) => playerDataAtom().get(player);

export const selectProfile = (player: Player) => selectData(player)?.profile;
