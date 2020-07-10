package ro.fasttrack.demo.controller;

import org.springframework.web.bind.annotation.*;
import ro.fasttrack.demo.domain.Game;
import ro.fasttrack.demo.domain.Hand;
import ro.fasttrack.demo.service.GameService;

import java.util.List;
import java.util.SortedMap;

@RestController
@RequestMapping("games")
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {
    private GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> getAllGames(@RequestParam(required = false) String username) {
        if (username == null) {
            return gameService.getAllGames();
        } else {
            return gameService.gamesWithPlayerInvolved(username);
        }
    }

    @GetMapping("{gameUrl}")
    public Game getGameByUrl(@PathVariable String gameUrl) {
        return gameService.getGameByUrl(gameUrl);
    }

    @GetMapping("{gameUrl}/summary")
    public SortedMap<String, String> gameSummary(@PathVariable String gameUrl) {
        return gameService.getGameSummary(gameUrl);
    }

    @PostMapping
    public Game addGame(@RequestBody Game newGame) {
        return gameService.addGame(newGame);
    }

    @PutMapping("/{gameUrl}/player/1")
    public Game addPlayer1(@PathVariable String gameUrl, @RequestBody String username) {
        return gameService.addPlayer1(username, gameUrl);
    }

    @PutMapping("/{gameUrl}/player/2")
    public Game addPlayer2(@PathVariable String gameUrl, @RequestBody String username) {
        return gameService.addPlayer2(username, gameUrl);
    }

    @PutMapping("/{gameUrl}/player/1/hand")
    public Game pickPlayer1Hand(@PathVariable String gameUrl, @RequestBody String hand) {
        return gameService.pickHandForPlayer1(gameUrl, Hand.valueOf(hand));
    }

    @PutMapping("/{gameUrl}/player/2/hand")
    public Game pickPlayer2Hand(@PathVariable String gameUrl, @RequestBody String hand) {
        return gameService.pickHandForPlayer2(gameUrl, Hand.valueOf(hand));
    }
}
