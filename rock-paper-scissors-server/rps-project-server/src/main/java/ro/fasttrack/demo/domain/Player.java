package ro.fasttrack.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Players")
public class Player {

    @Id
    @GeneratedValue
    @NonNull
    private Integer id;

    @NonNull
    private String username;

    private int wins = 0;
    private int losses = 0;
    private int draws = 0;

    public Player(String username) {
        this.username = username;
    }

    public void addWin() {
        this.wins++;
    }

    public void addLoss() {
        this.losses++;
    }

    public void addDraw() {
        this.draws++;
    }
}
