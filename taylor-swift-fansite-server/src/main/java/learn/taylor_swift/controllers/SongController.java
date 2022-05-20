package learn.taylor_swift.controllers;

import learn.taylor_swift.domain.Result;
import learn.taylor_swift.domain.SongService;
import learn.taylor_swift.models.Song;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

  @GetMapping("/{id}")
  public Song findById(@PathVariable int id) {
    return service.findById(id);
  }

  @PostMapping
  public ResponseEntity<Object> add(@RequestBody Song song) {
    Result<Song> result = service.add(song);
    if (result.isSuccess()) {
      return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }
    return ErrorResponse.build(result);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(@PathVariable int id, @RequestBody Song song) {
    if (id != song.getId()) {
      return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    Result<Song> result = service.update(song);
    if (result.isSuccess()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return ErrorResponse.build(result);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable int id) {
    if (service.deleteById(id)) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }
}
