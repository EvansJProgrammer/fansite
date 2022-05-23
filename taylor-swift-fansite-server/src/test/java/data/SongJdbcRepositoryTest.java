package data;

import learn.taylor_swift.data.SongsJdbcRepository;
import learn.taylor_swift.models.Song;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;

import java.time.LocalDate;
import java.util.List;

import static com.jayway.jsonpath.internal.path.PathCompiler.fail;
import static org.junit.jupiter.api.AssertTrue.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest. WebEnvironment.NONE)
public class SongJdbcRepositoryTest {

    @Autowired
    SongsJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup () {
        knownGoodState.set();
    }

    @Test
    void add() {
        Song song = makeSong();
        assertTrue(repository.add(song));

        try {
            repository.add(song);
            fail ("cannot add song to song list twice");
        } catch (DataAccessException ex) {

        }
    }

    @Test
    void update(){
        Song song = makeSong();
        song.setIdentifier("008");
        song.get

    }

    }
//    @Test
//    void shouldUpdate() {
//        AgencyAgent agencyAgent = makeAgencyAgent();
//        agencyAgent.setIdentifier("008"); // avoid duplicates
//        agencyAgent.getAgent().setAgentId(1);
//        assertTrue(repository.update(agencyAgent));
//
//        agencyAgent.setAgencyId(12);
//        assertFalse(repository.update(agencyAgent));
//    }
//
//    @Test
//    void shouldDelete() {
//        assertTrue(repository.deleteByKey(1, 3));
//        assertFalse(repository.deleteByKey(1, 3));
//    }
//
//    AgencyAgent makeAgencyAgent() {
//        AgencyAgent agencyAgent = new AgencyAgent();
//        agencyAgent.setAgencyId(1);
//        agencyAgent.setIdentifier("007");
//        agencyAgent.setActivationDate(LocalDate.of(2010, 6, 19));
//        agencyAgent.setActive(true);
//
//        SecurityClearance securityClearance = new SecurityClearance();
//        securityClearance.setSecurityClearanceId(1);
//        securityClearance.setName("Secret");
//        agencyAgent.setSecurityClearance(securityClearance);
//
//        Agent agent = new Agent();
//        agent.setAgentId(6);
//        agent.setFirstName("Test");
//        agencyAgent.setAgent(agent);
//        return agencyAgent;
//    }
//}