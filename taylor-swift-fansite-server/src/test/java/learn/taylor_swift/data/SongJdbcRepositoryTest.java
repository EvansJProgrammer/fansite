package learn.taylor_swift.data;

import learn.taylor_swift.data.KnownGoodState;
import learn.taylor_swift.data.SongsJdbcRepository;
import learn.taylor_swift.models.Gossip;
import learn.taylor_swift.data.SongsRepository;
import learn.taylor_swift.models.Song;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;

import java.time.LocalDate;
import java.util.List;
import java.util.function.BooleanSupplier;

import static com.jayway.jsonpath.internal.path.PathCompiler.fail;
//import static org.junit.jupiter.api.AssertTrue.assertTrue;
import static org.junit.jupiter.api.Assertions.*;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest. WebEnvironment.NONE)
public class SongJdbcRepositoryTest {

    final static int NEXT_ID = 3;

    @Autowired
    SongsJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup () {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Song> song = repository.findAll();
        assertNotNull(song);
        assertTrue (song.size() >= 1 && song.size() <= 5);
    }


    @Test
    void ShouldAdd() {
        Song song = makeSong();
        Song actual = repository.add(song);
        assertNotNull(actual);
        Assertions.assertEquals(NEXT_ID, actual.getId());

        song = makeSong ();
        actual = repository.add(song);
        assertNotNull(actual);
        Assertions.assertEquals(NEXT_ID +  1, actual.getId());
    }

    @Test
    void shouldUpdate() {
        Song song = makeSong();
        song.setId(10);
        assertFalse(repository.update(song));
        song.setId(13);
        assertFalse(repository.update(song));
    }

    @Test
    void shouldDelete(){
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(1));
    }


    @Test
    void shouldFindById() {
        Song song = makeSong();
        song.setId(10);
        assertFalse((BooleanSupplier) repository.findById(1));
        assertFalse((BooleanSupplier) repository.findById(2));
    }

    private Song makeSong() {
        Song song = new Song();
        song.setId(1);
        song.setTitle("Test");
        song.setLength("Test");
        song.setReleaseYear(1);
        song.setYouTubeUrl("Test");
        song.setSpotifyUrl("Test");
        return song;
    }

    }
