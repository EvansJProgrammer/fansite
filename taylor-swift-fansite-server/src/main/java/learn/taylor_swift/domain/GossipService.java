package learn.taylor_swift.domain;

import learn.taylor_swift.models.*;
import learn.taylor_swift.data.GossipRepository;
import org.springframework.stereotype.Service;
import learn.taylor_swift.data.*;

import java.time.LocalDate;
import java.util.List;

@Service
public class GossipService {

  private final GossipRepository repository;


  public GossipService(GossipRepository repository) {
    this.repository = repository;
  }

  public List<Gossip> findAll() {
    return repository.findAll();
  }

  public Result<Gossip> add(Gossip gossip) {
    Result<Gossip> result = validate(gossip);
    if (!result.isSuccess()) {
      return result;
    }

    if (gossip.getId() != 0) {
      result.addMessage("gossip cannot be set for `add` operation", ResultType.INVALID);
      return result;
    }

    gossip = repository.add(gossip);
    result.setPayload(gossip);
    return result;
  }

  public Result<Gossip> update(Gossip gossip) {
    Result<Gossip> result = validate(gossip);
    if (!result.isSuccess()) {
      return result;
    }

    if (gossip.getId() <= 0) {
      result.addMessage("gossip id must be set for `update` operation", ResultType.INVALID);
      return result;
    }

    if (!repository.update(gossip)) {
      String msg = String.format("agencyId: %s, not found", gossip.getId());
      result.addMessage(msg, ResultType.NOT_FOUND);
    }

    return result;
  }

  public boolean deleteById(int id) {
    return repository.deleteByKey(id);
  }

  private Result<Gossip> validate(Gossip gossip) {
    Result<Gossip> result = new Result<>();
    if (gossip == null) {
      result.addMessage("You have to put in some juicy gossip can't be blank", ResultType.INVALID);
      return result;
    }

    if (Validations.isNullOrBlank(gossip.getDeets())) {
      result.addMessage("juicy juicy details are required", ResultType.INVALID);
    }

    return result;
  }

}
