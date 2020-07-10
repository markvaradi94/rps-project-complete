import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Player} from './player.model';

@Injectable({providedIn: 'root'})
export class PlayerService {
  public API = '//localhost:8080';
  public PLAYER_API = this.API + '/players';
  error = new Subject<string>();
  player: Array<Player>;
  playerSubject = new Subject<Player>();

  constructor(private http: HttpClient) {
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.PLAYER_API);
  }

  addPlayer(player: Player): Observable<Player> {
    let result: Observable<Player>;
    result = this.http.post<Player>(this.PLAYER_API, player);
    return result;
  }

  getPlayerByUsername(username: string) {
    return this.http.get<Player>(this.PLAYER_API + '/' + username);
  }

  getPlayerHistory(username: string) {
    return this.http.get(this.PLAYER_API + '/' + username + '/history');
  }

  deletePLayerById(id: number) {
    return this.http.delete(this.PLAYER_API + '/' + id);
  }
}
