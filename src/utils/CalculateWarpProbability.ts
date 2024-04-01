const FIVE_STAR_CHARACTER_CHANCE = 0.006;
const FIVE_STAR_CONE_CHANCE = 0.008;
const CHARACTER_SOFT_PITY = 74;
const CONE_SOFT_PITY = 64;
const CHARACTER_PITY = 90;
const CONE_PITY = 80;
const LIMITED_CONE_CHANCE = 0.75;
const LIMITED_CHARACTER_CHANCE = 0.5; //Chance of getting the limited char when getting a 5 star (50%)
const SOFT_PITY_INCREMENT = 0.06;

export function CalculateWarpProbability(
  warps: number,
  characterPity: number,
  conePity: number,
  coneGuaranteed: boolean,
  characterGuaranteed: boolean,
  characterCopies: number,
  coneCopies: number,
  numSimulations: number
): Promise<number> {
  return new Promise<number>((resolve) => {
    let successesfullSimulations = 0;

    for (let i = 0; i < numSimulations; i++) {
      //if (i % 100 === 0) console.log(`${(i / NUM_SIMULATIONS) * 100}%`);

      let warpsLeft = warps;
      let charSuccesses = 0;
      let coneSuccesses = 0;
      let currConePity = conePity;
      let currCharPity = characterPity;
      let currConeGuaranteed = coneGuaranteed;
      let currCharacterGuaranteed = characterGuaranteed;

      while (warpsLeft > 0) {
        //pull warps number of times
        const randomValue = Math.random(); // Generate a random number between 0 and 1
        let currFiveStarChance = FIVE_STAR_CHARACTER_CHANCE;

        if (coneCopies > 0 ? charSuccesses < characterCopies : true) {
          //change curr rng
          currFiveStarChance +=
            SOFT_PITY_INCREMENT *
            Math.max(currCharPity - CHARACTER_SOFT_PITY, 0);
          /////

          //roll and see if you get 5 star
          if (
            randomValue < currFiveStarChance ||
            currCharPity + 1 === CHARACTER_PITY
          ) {
            //check if limited is garanteed
            if (
              currCharacterGuaranteed ||
              Math.random() < LIMITED_CHARACTER_CHANCE
            ) {
              charSuccesses++;

              //reset garaantee
              if (currCharacterGuaranteed === true)
                currCharacterGuaranteed = false;

              //reset pity
              currCharPity = 0;
            } else {
              currCharPity = 0;
              currCharacterGuaranteed = true;
            }
          } else {
            currCharPity++;
          }

          ////if turn to roll for lightcone
        } else {
          //change curr rng
          currFiveStarChance = FIVE_STAR_CONE_CHANCE;

          currFiveStarChance +=
            SOFT_PITY_INCREMENT * Math.max(currConePity - CONE_SOFT_PITY, 0);
          ////

          //roll and see if you get 5 star
          if (
            randomValue < currFiveStarChance ||
            currConePity + 1 === CONE_PITY
          ) {
            //check if limited is garanteed
            if (currConeGuaranteed || Math.random() < LIMITED_CONE_CHANCE) {
              coneSuccesses++;

              //reset garaantee
              if (currConeGuaranteed === true) currConeGuaranteed = false;

              //reset pity
              currConePity = 0;
            } else {
              currConePity = 0;
              currConeGuaranteed = true;
            }
          } else {
            currConePity++;
          }
        }
        warpsLeft--;
      }

      if (charSuccesses >= characterCopies && coneSuccesses >= coneCopies)
        successesfullSimulations++;
    }
    // Calculate the estimated probability of getting exactly characterCopies successful outcomes
    const estimatedProbability = successesfullSimulations / numSimulations;
    //console.log(`Chance:: ${estimatedProbability * 100}%`);

    resolve(estimatedProbability);
  });
}
