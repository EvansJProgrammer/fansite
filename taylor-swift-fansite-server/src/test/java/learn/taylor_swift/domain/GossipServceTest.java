package learn.taylor_swift.domain;

import learn.taylor_swift.data.GossipJdbcRepository;
import learn.taylor_swift.models.Gossip;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class GossipServceTest {

  @MockBean
  GossipJdbcRepository repository;

  @Autowired
  GossipService service;


  @Test
  void shouldAddWhenValid() {
    Gossip expected = makeGossip();
    Gossip arg  = makeGossip();
    arg.setId(0);

    when(repository.add(arg)).thenReturn(expected);
    Result<Gossip> result = service.add(arg);
    assertEquals(ResultType.SUCCESS, result.getType());

    assertEquals(expected, result.getPayload());
  }

  @Test
  void shouldNotAddWhenInvalid() {
    Gossip gossip = makeGossip();
    Result<Gossip> result = service.add(gossip);
    assertEquals(ResultType.INVALID, result.getType());

    gossip.setId(0);
    gossip.setDeets(null);
    result = service.add(gossip);
    assertEquals(ResultType.INVALID, result.getType());
  }

  @Test
  void shouldUpdate(){
    Gossip gossip = new Gossip();
    gossip.setId(1);
    gossip.setDeets("Taylor is writing two albums at once.");

    when(repository.update(gossip)).thenReturn(true);

    Result<Gossip> actual = service.update(gossip);
    assertEquals(ResultType.SUCCESS, actual.getType());

  }

  @Test
  void shouldNotUpdateMissingDeets(){
    Gossip gossip = new Gossip();
    gossip.setId(1);

    when(repository.update(gossip)).thenReturn(true);

    Result<Gossip> actual = service.update(gossip);
    assertEquals(ResultType.INVALID, actual.getType());

  }

  private Gossip makeGossip() {
    Gossip gossip = new Gossip();
    gossip.setId(1);
    gossip.setDeets("Taylor got awarded with an honorary Ph.D.");
    return gossip;
  }
}
