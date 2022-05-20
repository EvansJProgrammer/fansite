package learn.taylor_swift.controllers;

import learn.taylor_swift.domain.SongService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/song")
public class SongController {

  private final SongService service;

  public SongController(SongService service) {
    this.service = service;
  }
}
