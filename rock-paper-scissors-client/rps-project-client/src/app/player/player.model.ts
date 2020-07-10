export class Player {
  public username: string;
  public wins: number;
  public losses: number;
  public draws: number;

  constructor(username: string) {
    this.username = username;
  }
}

