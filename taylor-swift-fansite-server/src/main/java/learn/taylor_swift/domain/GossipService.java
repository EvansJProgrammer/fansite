package learn.taylor_swift.domain;

import learn.taylor_swift.models.*;
import learn.taylor_swift.data.GossipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GossipService {

  private final GossipRepository repository;


  public GossipService(GossipRepository repository) {
    this.repository = repository;
  }



}
