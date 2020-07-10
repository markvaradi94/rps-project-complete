import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerService} from '../../player/player.service';
import {GameService} from '../game.service';
import {Player} from '../../player/player.model';
import {Game} from '../game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Array<any>;
  gameForm: FormGroup;
  firstPlayer: any;
  secondPlayer: any;

  constructor(private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.getAllGames().subscribe(data => {
      this.games = data;
    });
    this.gameForm = new FormGroup({
      player1: new FormControl(null, [Validators.required]),
      player2: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.gameService.addGame(this.gameForm.value).subscribe(result => {
        this.games.push(result);
      }, error => console.error(error)
    );
    console.log(this.gameForm);
  }

  onAddPlayer1() {
    this.playerService.addPlayer(this.gameForm.value.player1).subscribe(result => {
        this.games.push({player1: result});
        this.gameService.addGame(new Game(
          new Player(result.username),
          new Player('')
        ));
        this.firstPlayer = {player1: result};
      }, error => console.error(error)
    );
    console.log(this.gameForm);
  }

  onGetAllGames() {
    this.gameService.getAllGames().subscribe(data => {
      this.games = data;
    });
  }

}
