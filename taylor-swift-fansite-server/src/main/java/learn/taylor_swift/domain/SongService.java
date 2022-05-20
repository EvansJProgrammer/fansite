package learn.taylor_swift.domain;

import learn.taylor_swift.data.SongsRepository;
import org.springframework.stereotype.Service;

@Service
public class SongService {

  private final SongsRepository repository;

  public SongService(SongsRepository repository) {
    this.repository = repository;
  }

}
