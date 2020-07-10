import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlayerService} from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private http: HttpClient,
              private playerService: PlayerService) {
  }

  ngOnInit(): void {
  }
}
