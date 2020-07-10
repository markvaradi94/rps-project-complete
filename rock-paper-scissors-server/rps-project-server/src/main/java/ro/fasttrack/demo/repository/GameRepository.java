package ro.fasttrack.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ro.fasttrack.demo.domain.Game;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface GameRepository extends JpaRepository<Game, Integer> {
}
