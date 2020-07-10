package ro.fasttrack.demo.controller;

import org.springframework.web.bind.annotation.*;
import ro.fasttrack.demo.domain.Player;
import ro.fasttrack.demo.service.PlayerService;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("players")
@CrossOrigin(origins = "http://localhost:4200")
public class PlayerController {
    private PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public Collection<Player> allPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("{username}")
    public Player findPlayerByUsername(@PathVariable String username) {
        return playerService.getPlayerByUsername(username);
    }

    @GetMapping("{username}/history")
    public Map<String, Map<String, String>> getPlayerHistoryByUsername(@PathVariable String username) {
        return playerService.getPlayerHistory(username);
    }

    @PostMapping
    public Player addPlayer(@RequestBody Player player) {
        return playerService.addPlayer(player);
    }

    @PutMapping("{id}")
    public Player replacePlayer(@PathVariable Integer id, @RequestBody Player player) {
        return playerService.updatePlayerById(id, player);
    }

    @DeleteMapping("{id}")
    public Player deletePlayer(@PathVariable Integer id) {
        return playerService.deletePlayerById(id);
    }
}
