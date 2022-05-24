package learn.taylor_swift.domain;


import learn.taylor_swift.data.*;
import learn.taylor_swift.models.Song;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class SongServiceTest {

    @MockBean
    SongsJdbcRepository repository;

    @Autowired
    SongService service;

    @Test
    void shouldFindHazel() {
        // pass-through test, probably not useful
        Song expected = makeSong();
        when(repository.findById(1)).thenReturn(expected);
        Song actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Song song = makeSong();
        Result<Song> result = service.add(song);
        assertEquals(ResultType.INVALID, result.getType());

        song.setId(0);
        song.setTitle(null);
        result = service.add(song);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddWhenValid() {
        Song expected = makeSong();
        Song arg  = makeSong();
        arg.setId(0);

        when(repository.add(arg)).thenReturn(expected);
        Result<Song> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());

        assertEquals(expected, result.getPayload());
    }

    Song makeSong() {
        Song song = new Song();
        song.setId(1);
        song.setTitle("Hazel");
        song.setLength("C");
        song.setYouTubeUrl("Sauven");
        song.setSpotifyUrl("Test");
        song.setReleaseYear(1995);
        return song;
    }
}