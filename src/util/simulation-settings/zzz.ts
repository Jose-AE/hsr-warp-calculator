import { ISimulationSettings } from "./interfaces";

const settings: ISimulationSettings = {
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
    softPity: 64,
    softPityIncrement: 0.06,
  },
  weaponRate: {
    baseRate: 0.008,
    guarantedAfter: 1,
    limitedOptions: 1,
    limitedRate: 0.75,
  },
};

export default settings;
