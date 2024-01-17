import { Rarity } from '@prisma/client';

export const CardAction = 'casino_card_open_action';
export const CollectionAction = 'collection_open_action';
export const StudioActions = 'studio_open_action';

export const CardNums: Record<Rarity & 'all', number> = {
  all: 31,
  [Rarity.OMEZHKA]: 1,
  [Rarity.BASIC]: 1,
  [Rarity.RARE]: 1,
  [Rarity.ELEPHANT]: 1,
  [Rarity.ELEPHANT_SHARK]: 1,
  [Rarity.ALPHA]: 1,
};
