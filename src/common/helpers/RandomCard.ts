import { CardNums } from '@/app.consts';
import { Rarity } from '@prisma/client';
import { MathHelper } from './MathHelper';

export class RandomCard {
  category: Rarity;
  srcAsset: string;

  constructor() {
    const randomNum = Math.random();
    if (0 <= randomNum && randomNum <= 0.35) {
      this.category = Rarity.OMEZHKA;
    } else if (0.35 < randomNum && randomNum <= 0.7) {
      this.category = Rarity.BASIC;
    } else if (0.7 < randomNum && randomNum <= 0.8) {
      this.category = Rarity.RARE;
    } else if (0.8 < randomNum && randomNum <= 0.85) {
      this.category = Rarity.ELEPHANT;
    } else if (0.85 < randomNum && randomNum <= 0.97) {
      this.category = Rarity.ELEPHANT_SHARK;
    } else if (0.97 < randomNum && randomNum <= 1) {
      this.category = Rarity.ALPHA;
    }

    const cardCatNumber = CardNums[this.category];
    const randomCardNum = MathHelper.getRandomInterval(1, cardCatNumber);

    this.srcAsset = `assets/cards/${this.category}/card_${randomCardNum}.jpg`;
  }
}
