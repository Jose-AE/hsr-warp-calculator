import { ISimulationSettings } from "./interfaces";

export const zzzSettings: ISimulationSettings = {
  characterPity: {
    hardPity: 90,
    softPity: 74,
    softPityIncrement: 0.06,
  },
  characterRate: {
    baseRate: 0.006,
    guarantedAfter: 1,
    limitedOptions: 1,
    limitedRate: 0.5,
  },
  weaponPity: {
    hardPity: 80,
    softPity: 65,
    softPityIncrement: 0.06,
  },
  weaponRate: {
    baseRate: 0.01,
    guarantedAfter: 1,
    limitedOptions: 1,
    limitedRate: 0.75,
  },
};
