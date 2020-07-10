import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from './start/start.component';
import {PlayerListComponent} from './player/player-list/player-list.component';
import {GameListComponent} from './game/game-list/game-list.component';
import {NgModule} from '@angular/core';
import {Player1HandComponent} from './player1-hand/player1-hand.component';
import {SummaryComponent} from './summary/summary.component';
import {JoinGameComponent} from './join-game/join-game.component';
import {Player2HandComponent} from './player2-hand/player2-hand.component';
import {HistoryComponent} from './history/history.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: 'start', component: StartComponent},
  {path: 'players', component: PlayerListComponent},
  {path: 'players/:username/history', component: HistoryComponent},
  {path: 'games', component: GameListComponent},
  {path: 'games/:gameUrl', redirectTo: 'games/:gameUrl/join', pathMatch: 'full'},
  {path: 'games/:gameUrl/summary', component: SummaryComponent},
  {path: 'games/:gameUrl/join', component: JoinGameComponent},
  {path: 'games/:gameUrl/player/1', component: Player1HandComponent},
  {path: 'games/:gameUrl/player/2', component: Player2HandComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
