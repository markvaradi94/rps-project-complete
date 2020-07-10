package ro.fasttrack.demo.service;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.stereotype.Service;
import ro.fasttrack.demo.domain.Game;
import ro.fasttrack.demo.domain.GameStatus;
import ro.fasttrack.demo.domain.Hand;
import ro.fasttrack.demo.domain.Player;
import ro.fasttrack.demo.exceptions.ResourceNotFoundException;
import ro.fasttrack.demo.exceptions.SamePlayerException;
import ro.fasttrack.demo.repository.GameRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final PlayerService playerService;

    public GameService(GameRepository gameRepository, PlayerService playerService) {
        this.gameRepository = gameRepository;
        this.playerService = playerService;
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game addGame(Game game) {
        Game gameToAdd = checkGameExists(game);
        checkIdenticalPlayers(gameToAdd);
        Game updatedGame = updateGame(gameToAdd, gameWithResult(game));
        return gameRepository.save(updatedGame);
    }

    public Game getGameByUrl(String url) {
        return getOrThrowByUrl(url);
    }

    public Game getGameById(Integer id) {
        return getOrThrow(id);
    }

    public List<Game> gamesWithPlayerInvolved(String username) {
        Player playerToFind = playerService.getPlayerByUsername(username);
        return gameRepository.findAll().stream()
                .filter(game -> gameInvolvesPlayer(game, playerToFind.getUsername()))
                .collect(Collectors.toList());
    }

    public Game addPlayer1(String username, String gameUrl) {
        Player player1 = playerService.getPlayerByUsername(username);
        Game game = getGameByUrl(gameUrl);
        game.setPlayer1(player1);
        playerService.addPlayer(player1);
        return addGame(game);
    }

    public Game addPlayer2(String username, String gameUrl) {
        Player player2 = playerService.getPlayerByUsername(username);
        Game game = getGameByUrl(gameUrl);
        game.setPlayer2(player2);
        playerService.addPlayer(player2);
        return addGame(game);
    }

    public Game pickHandForPlayer1(String gameUrl, Hand hand) {
        Game game = getGameByUrl(gameUrl);
        game.setPlayer1Hand(hand);
        return addGame(game);
    }

    public Game pickHandForPlayer2(String gameUrl, Hand hand) {
        Game game = getGameByUrl(gameUrl);
        game.setPlayer2Hand(hand);
        return addGame(game);
    }

    public SortedMap<String, String> getGameSummary(String gameUrl) {
        Game game = getOrThrowByUrl(gameUrl);
        return generateSummary(game);
    }

    private SortedMap<String, String> generateSummary(Game game) {
        SortedMap<String, String> summary = new TreeMap<>();
        summary.put("player1", game.getPlayer1().getUsername());
        summary.put("player2", game.getPlayer2().getUsername());
        summary.put("player1Hand", game.getPlayer1Hand().toString());
        summary.put("player2Hand", game.getPlayer2Hand().toString());
        summary.put("gameStatus", game.getGameStatus().message());
        return summary;
    }

    private boolean gameInvolvesPlayer(Game game, String username) {
        return game.getPlayer1().getUsername().equals(username) || game.getPlayer2().getUsername().equals(username);
    }

    private String generateRandomUrl() {
        return RandomStringUtils.randomAlphanumeric(10);
    }

    private Game updateGame(Game gameToAdd, Game gameWithResult) {
        gameToAdd.setGameUrl(gameWithResult.getGameUrl() == null ? generateRandomUrl() : gameWithResult.getGameUrl());
        gameToAdd.setGameStatus(gameWithResult.getGameStatus());
        gameToAdd.setPlayer1Hand(gameWithResult.getPlayer1Hand() == null ? Hand.NONE : gameWithResult.getPlayer1Hand());
        gameToAdd.setPlayer2Hand(gameToAdd.getPlayer2Hand() == null ? Hand.NONE : gameWithResult.getPlayer2Hand());
        return checkNullHand(gameToAdd);
    }

    private Game checkGameExists(Game game) {
        Game gameToAdd;
        if (game.getId() != null) {
            gameToAdd = getGameById(game.getId());
        } else {
            gameToAdd = new Game(playerService.addPlayer(game.getPlayer1()),
                    playerService.addPlayer(game.getPlayer2() == null ? new Player("Waiting for player to join") : game.getPlayer2()),
                    generateRandomUrl());
        }
        return gameToAdd;
    }

    private Game checkNullHand(Game game) {
        if (game.getPlayer1Hand() == null) {
            game.setPlayer1Hand(Hand.NONE);
        }
        if (game.getPlayer2Hand() == null) {
            game.setPlayer2Hand(Hand.NONE);
        }
        return game;
    }

    private void checkIdenticalPlayers(Game game) {
        Player player1 = playerService.getPlayerById(game.getPlayer1().getId());
        Player player2 = playerService.getPlayerById(game.getPlayer2().getId()) == null ? new Player("Waiting for player to join") :
                playerService.getPlayerById(game.getPlayer2().getId());
        if (player1.getId().equals(player2.getId()) || player1.getUsername().equals(player2.getUsername())) {
            throw new SamePlayerException("Cannot create game with identical players");
        }
    }

    private Game gameWithResult(Game game) {
        GameStatus status = checkPlayerHands(game);
        return new Game(game.getPlayer1(), game.getPlayer2(), game.getGameUrl(), status,
                game.getPlayer1Hand(), game.getPlayer2Hand());
    }

    private GameStatus checkPlayerHands(Game game) {
        if (game.getPlayer1Hand() == null) {
            game.setPlayer1Hand(Hand.NONE);
            return GameStatus.WAITING_FOR_PLAYER;
        } else if (game.getPlayer2Hand() == null) {
            game.setPlayer2Hand(Hand.NONE);
            return GameStatus.WAITING_FOR_PLAYER;
        } else {
            return gameStatus(game);
        }
    }

    private GameStatus gameStatus(Game game) {
        if (game.getPlayer1Hand().equals(Hand.ROCK) && game.getPlayer2Hand().equals(Hand.SCISSORS) ||
                game.getPlayer1Hand().equals(Hand.PAPER) && game.getPlayer2Hand().equals(Hand.ROCK) ||
                game.getPlayer1Hand().equals(Hand.SCISSORS) && game.getPlayer2Hand().equals(Hand.PAPER)) {
            playerService.addWinToPlayer(game.getPlayer1());
            playerService.addLossToPlayer(game.getPlayer2());
            return GameStatus.PLAYER_1_WINS;
        } else if (game.getPlayer1Hand().equals(game.getPlayer2Hand()) && !game.getPlayer1Hand().equals(Hand.NONE) &&
                !game.getPlayer2Hand().equals(Hand.NONE)) {
            playerService.addDrawToPlayer(game.getPlayer1());
            playerService.addDrawToPlayer(game.getPlayer2());
            return GameStatus.DRAW;
        } else if (game.getPlayer1Hand().equals(Hand.NONE) || game.getPlayer2Hand().equals(Hand.NONE)) {
            return GameStatus.WAITING_FOR_PLAYER;
        } else {
            playerService.addWinToPlayer(game.getPlayer2());
            playerService.addLossToPlayer(game.getPlayer1());
            return GameStatus.PLAYER_2_WINS;
        }
    }

    private Game getOrThrow(Integer id) {
        return gameRepository.findAll().stream()
                .filter(game -> game.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Could not find game with ID " + id));
    }

    private Game getOrThrowByUrl(String gameUrl) {
        return gameRepository.findAll().stream()
                .filter(game -> game.getGameUrl().equals(gameUrl))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Could not find game with URL " + gameUrl));
    }
}
