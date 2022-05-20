package learn.taylor_swift.controllers;

import learn.taylor_swift.domain.GossipService;
import learn.taylor_swift.domain.Result;
import learn.taylor_swift.models.Gossip;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/gossip")
public class GossipController {

  private final GossipService service;

  public GossipController(GossipService service) {
    this.service = service;
  }

  @GetMapping
  public List<Gossip> findAll() {
    return service.findAll();
  }

  @PostMapping
  public ResponseEntity<Object> add(@RequestBody Gossip gossip) {
    Result<Gossip> result = service.add(gossip);
    if (result.isSuccess()) {
      return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }
    return ErrorResponse.build(result);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(@PathVariable int id, @RequestBody Gossip gossip) {
    if (id != gossip.getId()) {
      return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    Result<Gossip> result = service.update(gossip);
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
