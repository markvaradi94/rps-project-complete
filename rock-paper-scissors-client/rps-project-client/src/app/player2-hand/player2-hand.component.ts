import {Component, OnInit} from '@angular/core';
import {Game} from '../game/game.model';
import {GameService} from '../game/game.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Player} from '../player/player.model';

@Component({
  selector: 'app-player2-hand',
  templateUrl: './player2-hand.component.html',
  styleUrls: ['./player2-hand.component.css']
})
export class Player2HandComponent implements OnInit {
  url: string;
  game: Game;
  player2: Player;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.url = localStorage.getItem('url');
    this.game = JSON.parse(localStorage.getItem('game')) as Game;
    this.player2 = JSON.parse(localStorage.getItem('player2')) as Player;
  }

  onRock() {
    this.gameService.pickPlayer2Hand(this.url, 'ROCK').subscribe(data => {
      this.gameService.gameSubject.next(data as Game);
    });
    this.gameService.gameSubject.subscribe(result => {
      localStorage.setItem('game', JSON.stringify(result));
      this.router.navigate(['/games/' + this.url + '/summary'], {relativeTo: this.route});
    });
  }

  onPaper() {
    this.gameService.pickPlayer2Hand(this.url, 'PAPER').subscribe(data => {
      this.gameService.gameSubject.next(data as Game);
    });
    this.gameService.gameSubject.subscribe(result => {
      localStorage.setItem('game', JSON.stringify(result));
      this.router.navigate(['/games/' + this.url + '/summary'], {relativeTo: this.route});
    });
  }

  onScissors() {
    this.gameService.pickPlayer2Hand(this.url, 'SCISSORS').subscribe(data => {
      this.gameService.gameSubject.next(data as Game);
    });
    this.gameService.gameSubject.subscribe(result => {
      this.game = result as Game;
      localStorage.setItem('game', JSON.stringify(this.game));
      this.router.navigate(['/games/' + this.url + '/summary'], {relativeTo: this.route});
    });
  }

}
