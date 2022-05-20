package learn.taylor_swift.data.mappers;

import learn.taylor_swift.models.Song;

import javax.swing.tree.TreePath;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;


public class SongMapper implements RowMapper<Song> {
    @Override
    public Song mapRow(ResultSet resultSet, int i) throws SQLException {
        Song song = new Song();
        song.setId(resultSet.getInt("id"));
        song.setTitle(resultSet.getString("title"));
        song.setLength(resultSet.getString("length"));
        song.setYouTubeUrl(resultSet.getString("youTubeUrl"));
        song.setSpotifyUrl(resultSet.getString("spotifyUrl"));
        song.setReleaseYear(resultSet.getInt("releaseYear"));
        return song;
    }
}
