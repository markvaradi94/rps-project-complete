import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../player/player.service';
import {GameService} from '../game/game.service';
import {Player} from '../player/player.model';
import {Game} from '../game/game.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  startForm: FormGroup;
  game: Game;
  player: Player;
  url: string;

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.startForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  setUrl(url: string) {
    this.url = url;
  }

  onAddPlayer() {
    this.playerService.addPlayer(this.startForm.value).subscribe(result => {
        this.player = result;
        this.playerService.playerSubject.next(this.player);
        this.gameService.addGame(
          new Game(
            new Player(result.username)
          )
        ).subscribe(data => {
          this.game = data;
          this.gameService.gameSubject.next(this.game);
          this.setUrl(data.gameUrl);
          this.onStartNewGame();
        });
      }, error => console.error(error)
    );
    this.playerService.playerSubject.subscribe(result => {
      localStorage.setItem('player1', JSON.stringify(result));
    });
    this.gameService.gameSubject.subscribe(result => {
      localStorage.setItem('game', JSON.stringify(result));
      localStorage.setItem('url', result.gameUrl);
    });
  }

  onStartNewGame() {
    this.router.navigate(['/games/' + this.url + '/player/1'], {relativeTo: this.route});
  }


}
