package learn.taylor_swift.data;

import learn.taylor_swift.data.mappers.SongMapper;
import learn.taylor_swift.models.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class SongsJdbcRepository implements SongsRepository {

    private final JdbcTemplate jdbcTemplate;

    public SongsJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Song> findAll() {
        final String sql = "select * from song";
        return jdbcTemplate.query(sql, new SongMapper());
    }

    @Override
    public Song add(Song song) {
        final String sql = "insert into song (title, length, youTubeUrl, spotifyUrl, releaseYear) values (?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, song.getTitle());
            ps.setString(2, song.getLength());
            ps.setString(3, song.getYouTubeUrl());
            ps.setString(4, song.getSpotifyUrl());
            ps.setInt(5, song.getReleaseYear());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        song.setId(keyHolder.getKey().intValue());
        return song;
    }

    @Override
    public boolean update(Song song) {
        final String sql = "update song set " + "title = ?, "
                + "length = ?, "
                + "youTubeUrl = ?, "
                + "spotifyUrl = ?, "
                + "releaseYear = ?,"
                + "where id = ?;";

        return jdbcTemplate.update(sql, song.getTitle(), song.getLength(), song.getYouTubeUrl(), song.getSpotifyUrl(), song.getReleaseYear()) > 0;
    }

    @Override
    public boolean deleteById(int id) {
        return jdbcTemplate.update( "delete from song where id = ?", id) > 0;
    }
}
