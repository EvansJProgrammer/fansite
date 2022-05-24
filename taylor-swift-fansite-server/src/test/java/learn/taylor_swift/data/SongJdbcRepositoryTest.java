package learn.taylor_swift.data;


import learn.taylor_swift.models.Song;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
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
        assertEquals(NEXT_ID + 1, actual.getId());

        song = makeSong ();
        actual = repository.add(song);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 2, actual.getId());
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
        Song  song = repository.findById(1);
        assertEquals(1, song.getId());
        assertEquals("Bad Blood", song.getTitle());
    }



    private Song makeSong() {
        Song song = new Song();
        song.setId(1);
        song.setTitle("Test");
        song.setLength("Test");
        song.setYouTubeUrl("Test");
        song.setSpotifyUrl("Test");
        song.setReleaseYear(1995);
        return song;
    }

    }
