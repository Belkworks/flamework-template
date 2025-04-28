export type PlayerData = {
	profile: PlayerProfile;
};

export type PlayerProfile = {
	money?: number;
};

export const defaultData: PlayerData = {
	profile: {},
};
