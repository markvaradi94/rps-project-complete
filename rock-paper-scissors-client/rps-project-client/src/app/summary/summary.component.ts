import {Component, Injectable, OnInit} from '@angular/core';
import {Game} from '../game/game.model';
import {GameService} from '../game/game.service';
import {PlayerService} from '../player/player.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})

@Injectable()
export class SummaryComponent implements OnInit {
  game: Game;
  summary: any;
  result: string;

  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.gameService.gameSubject.subscribe(result => {
      this.game = result as Game;
      localStorage.setItem('game', JSON.stringify(this.game));
    });
    this.game = JSON.parse(localStorage.getItem('game')) as Game;
    this.gameService.getGameSummary(this.game.gameUrl).subscribe(result => {
      this.summary = result;
      localStorage.setItem('summary', JSON.stringify(this.summary));
    });

    const refresh = window.setInterval(() => {
      window.location.reload();
    }, 5000);
    if (this.isValid()) {
      window.clearInterval(refresh);
    }
  }

  onPlayer1History() {
    this.router.navigate(['/players/' + this.game.player1.username + '/history']);
  }

  onPlayer2History() {
    this.router.navigate(['/players/' + this.game.player2.username + '/history']);
  }

  isValid() {
    return this.game.player2.username !== 'Waiting for player to join' && this.game.player2Hand !== 'NONE';
  }

  validRestart() {
    return this.isValid() && this.game.player1.username;
  }

  player1Wins() {
    return this.game.gameStatus === 'PLAYER_1_WINS';
  }

  player1Loses() {
    return this.game.gameStatus === 'PLAYER_2_WINS';
  }

  player2Wins() {
    return this.game.gameStatus === 'PLAYER_2_WINS';
  }

  player2Loses() {
    return this.game.gameStatus === 'PLAYER_1_WINS';
  }

  isDraw() {
    return this.game.gameStatus === 'DRAW';
  }
}
