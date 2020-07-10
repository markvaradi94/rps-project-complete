import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PlayerComponent} from './player/player.component';
import {PlayerService} from './player/player.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StartComponent} from './start/start.component';
import {GameComponent} from './game/game.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PlayerListComponent} from './player/player-list/player-list.component';
import {GameService} from './game/game.service';
import {GameListComponent} from './game/game-list/game-list.component';
import {AppRoutingModule} from './app-routing.module';
import {Player1HandComponent} from './player1-hand/player1-hand.component';
import {SummaryComponent} from './summary/summary.component';
import {JoinGameComponent} from './join-game/join-game.component';
import {Player2HandComponent} from './player2-hand/player2-hand.component';
import {HistoryComponent} from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    StartComponent,
    GameComponent,
    PlayerListComponent,
    GameListComponent,
    Player1HandComponent,
    SummaryComponent,
    JoinGameComponent,
    Player2HandComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PlayerService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
