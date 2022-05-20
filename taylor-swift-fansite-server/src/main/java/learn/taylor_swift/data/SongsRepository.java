package learn.taylor_swift.data;

import learn.taylor_swift.models.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SongsRepository {

    List<Song> findAll();

    Song Add(Song song);

    boolean update(Song song);

    boolean deleteById(int id);


}
