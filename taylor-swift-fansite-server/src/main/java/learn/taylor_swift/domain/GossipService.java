package learn.taylor_swift.domain;

import learn.taylor_swift.data.GossipRepository;
import org.springframework.stereotype.Service;

@Service
public class GossipService {

  private final GossipRepository repository;


  public GossipService(GossipRepository repository) {
    this.repository = repository;
  }
}
