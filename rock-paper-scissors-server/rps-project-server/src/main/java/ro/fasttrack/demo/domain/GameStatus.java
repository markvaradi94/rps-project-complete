package ro.fasttrack.demo.domain;

import java.util.Arrays;

public enum GameStatus {
    PLAYER_1_WINS,
    PLAYER_2_WINS,
    DRAW,
    WAITING_FOR_PLAYER;

    public String message() {
        String[] tokens = this.toString().split("_");
        StringBuilder result = new StringBuilder();
        Arrays.asList(tokens).forEach(token -> result.append(token).append(" "));
        return result.toString().trim();
    }
}
