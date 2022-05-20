package learn.taylor_swift.controllers;

import learn.taylor_swift.domain.SongService;
import learn.taylor_swift.models.Song;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/song")
public class SongController {

  private final SongService service;

  public SongController(SongService service) {
    this.service = service;
  }

  @GetMapping
  public List<Song> findAll() {
    return service.findAll();
  }

}
