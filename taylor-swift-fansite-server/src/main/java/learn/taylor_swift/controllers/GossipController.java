package learn.taylor_swift.controllers;

import learn.taylor_swift.domain.GossipService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/gossip")
public class GossipController {

  private final GossipService service;

  public GossipController(GossipService service) {
    this.service = service;
  }
}
