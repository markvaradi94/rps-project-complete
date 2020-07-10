import {Player} from '../player/player.model';
import {Hand} from './hand.enum';

export class Game {
  public player1: Player;
  public player2: Player;
  public gameUrl: string;
  public player1Hand: Hand;
  public player2Hand: Hand;
  public gameStatus: string;

  public constructor(player1: Player, player2?: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }
}
