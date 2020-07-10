import {Component, OnInit} from '@angular/core';
import {Game} from '../game/game.model';
import {PlayerService} from '../player/player.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Player} from '../player/player.model';
import {GameService} from '../game/game.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  player: Player;
  url: string;
  game: Game;

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.playerService.getPlayerByUsername(username).subscribe(result => {
      this.player = result;
      localStorage.setItem('currentPlayer', JSON.stringify(this.player));
    });
    this.player = JSON.parse(localStorage.getItem('currentPlayer')) as Player;
  }

  onStartNewGame() {
    this.gameService.addGame(
      new Game(
        new Player(this.player.username),
        new Player('Waiting for player to join')
      )
    )
      .subscribe(data => {
        this.game = data as Game;
        this.gameService.gameSubject.next(this.game);
        this.setUrl(data.gameUrl);
        localStorage.setItem('url', this.url);
        this.router.navigate(['/games/' + this.url + '/player/1']);
      }, error => console.error(error));
    this.gameService.gameSubject.subscribe(data => {
      this.game = data as Game;
      localStorage.setItem('game', JSON.stringify(this.game));
    });
  }

  setUrl(url: string) {
    this.url = url;
  }
}
