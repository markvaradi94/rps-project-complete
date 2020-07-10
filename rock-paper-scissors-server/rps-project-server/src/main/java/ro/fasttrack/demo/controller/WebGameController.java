package ro.fasttrack.demo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import ro.fasttrack.demo.domain.Game;
import ro.fasttrack.demo.service.GameService;

@Controller
public class WebGameController {
    private GameService gameService;

    public WebGameController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/game")
    @SendTo("/topic/games")
    public Game sendGame(String gameUrl) {
        return gameService.getGameByUrl(gameUrl);
    }
}
