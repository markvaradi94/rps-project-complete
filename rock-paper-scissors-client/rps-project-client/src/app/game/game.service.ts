import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PlayerService} from '../player/player.service';
import {Game} from './game.model';

@Injectable({providedIn: 'root'})
export class GameService {
  public API = '//localhost:8080';
  public GAME_API = this.API + '/games';
  error = new Subject<string>();
  gameSubject = new Subject<Game>();

  constructor(private http: HttpClient,
              private playerService: PlayerService) {
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.GAME_API);
  }

  addGame(game: Game): Observable<Game> {
    let result: Observable<Game>;
    result = this.http.post<Game>(this.GAME_API, game);
    return result;
  }

  getGameByUrl(gameUrl: string) {
    return this.http.get<Game>(this.GAME_API + '/' + gameUrl);
  }

  getGameById(id: number) {
    return this.http.get<Game>(this.GAME_API + '/' + id);
  }

  getGameSummary(gameUrl: string) {
    return this.http.get<Game>(this.GAME_API + '/' + gameUrl + '/summary');
  }

  pickPlayer1Hand(gameUrl: string, hand: string) {
    return this.http.put<Game>(this.GAME_API + '/' + gameUrl + '/player/1/hand', hand);
  }

  pickPlayer2Hand(gameUrl: string, hand: string) {
    return this.http.put<Game>(this.GAME_API + '/' + gameUrl + '/player/2/hand', hand);
  }

  addPlayer2(gameUrl: string, username: string) {
    return this.http.put<Game>(this.GAME_API + '/' + gameUrl + '/player/2', username);
  }

  reloadPage(location: Location) {
    location.reload();
  }
}
