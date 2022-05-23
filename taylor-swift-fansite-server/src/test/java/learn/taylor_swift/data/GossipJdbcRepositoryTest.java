package learn.taylor_swift.data;

import learn.taylor_swift.models.Gossip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GossipJdbcRepositoryTest {

    final static int NEXT_ID = 9;

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
        assertTrue(gossip.size() >= 7 && gossip.size() <= 10);
    }

    @Test
    void shouldAdd() {
        // all fields
        Gossip agent = makeGossip();
        Gossip actual = repository.add(agent);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getId());

        // null dob
        agent = makeGossip();
        actual = repository.add(agent);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getId());
    }

    @Test
    void shouldUpdate() {
        Gossip gossip = makeGossip();
        gossip.setId(3);
        assertTrue(repository.update(gossip));
        gossip.setId(13);
        assertFalse(repository.update(gossip));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteByKey(2));
        assertFalse(repository.deleteByKey(2));
    }

    private Gossip makeGossip() {
        Gossip gossip = new Gossip();
        gossip.setId(1);
        gossip.setDeets("Test");
        return gossip;
    }
}