import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../player.service';
import {GameService} from '../../game/game.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Player} from '../player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Array<Player>;
  playerForm: FormGroup;

  constructor(private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe(data => {
      this.players = data;
    });
    this.playerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      queryName: new FormControl(null)
    });
  }

  onGetAllPlayers() {
    this.playerService.getAllPlayers().subscribe(data => {
      this.players = data;
    });
  }

  onSubmit() {
    this.playerService.addPlayer(this.playerForm.value).subscribe(result => {
        this.players.push(result);
      }, error => console.error(error)
    );
    console.log(this.playerForm);
    this.playerForm.reset();
  }

  onGetPlayer() {
    this.playerService.getPlayerByUsername(this.playerForm.value.queryName).subscribe(player => {
        console.log(player);
      }, error => console.error(error)
    );
  }

  updatePlayer(newPlayer) {
    this.players[newPlayer.id] = newPlayer;
  }

  onPlayerHistory() {
    this.playerService.getPlayerHistory(this.playerForm.value.queryName).subscribe(result => {
        console.log(result);
      }, error => console.error(error)
    );
  }

}
