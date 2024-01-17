import { Controller } from '@nestjs/common';
import { CardService } from './cards.service';

@Controller('/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}
}
