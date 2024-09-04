export interface IRate {
  baseRate: number; ///base % chance to get 5star
  limitedRate: number; ///base % chance for 5* to be the limited  most of the time 50/50
  limitedOptions: number; // number of 5* limited options you can get (eg: weapon banner has 2)
  guarantedAfter: number; // number of base rates you have to win to guarantee the limited 5* you want
}

export interface IPity {
  hardPity: number;
  softPity: number;
  softPityIncrement: number;
}

export interface ISimulationSettings {
  characterRate: IRate;
  characterPity: IPity;

  weaponRate: IRate;
  weaponPity: IPity;
}
