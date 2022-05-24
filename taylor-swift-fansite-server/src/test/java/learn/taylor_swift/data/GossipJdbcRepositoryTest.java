package learn.taylor_swift.data;

import learn.taylor_swift.data.GossipJdbcRepository;
import learn.taylor_swift.models.Gossip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public
class  GossipJdbcRepositoryTest {

    public final static int NEXT_ID = 3;

    @Autowired
    GossipJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Gossip> gossip = repository.findAll();
        assertNotNull(gossip);
        assertTrue(gossip.size() >= 1 && gossip.size() <= 3);
    }

    @Test
    void shouldAdd() {
        // all fields
        Gossip gossip = makeGossip();
        Gossip actual = repository.add(gossip);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getId());

        // null dob
        gossip = makeGossip();
        actual = repository.add(gossip);
        assertNotNull(actual);
        assertEquals(NEXT_ID +  1, actual.getId());
    }

    @Test
    void shouldUpdate() {
        Gossip gossip = makeGossip();
        gossip.setId(10);
        assertFalse(repository.update(gossip));
        gossip.setId(13);
        assertFalse(repository.update(gossip));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteByKey(1));
        assertFalse(repository.deleteByKey(1));
    }

    private Gossip makeGossip() {
        Gossip gossip = new Gossip();
        gossip.setId(1);
        gossip.setDeets("Test");
        return gossip;
    }
}