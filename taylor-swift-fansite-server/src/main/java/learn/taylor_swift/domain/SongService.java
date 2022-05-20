package learn.taylor_swift.domain;

import learn.taylor_swift.models.*;
import learn.taylor_swift.data.SongsRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SongService {

  private final SongsRepository repository;

  public SongService(SongsRepository repository) {
    this.repository = repository;
  }

  public List<Song> findAll() {
    return repository.findAll();
  }



  public Result<Song> add(Song song) {
    Result<Song> result = validate(song);
    if (!result.isSuccess()) {
      return result;
    }

    if (song.getId() != 0) {
      result.addMessage("songId cannot be set for `add` operation", ResultType.INVALID);
      return result;
    }

    song = repository.add(song);
    result.setPayload(song);
    return result;
  }

  private Result<Song> validate(Song song) {
    Result<Song> result = new Result<>();

    if (song == null) {
      result.addMessage("song can't be null", ResultType.INVALID);
    }

    if (Validations.isNullOrBlank(song.getTitle())) {
      result.addMessage("Title is required!", ResultType.INVALID);
    }

    if (Validations.isNullOrBlank(song.getLength())) {
      result.addMessage("Length is required!", ResultType.INVALID);
    }

    if (song.getReleaseYear() == 0) {
      result.addMessage("Release Year is required!", ResultType.INVALID);
    }

    return result;
  }

  public Result<Song> update(Song song) {
    Result<Song> result = validate(song);
    if (!result.isSuccess()) {
      return result;
    }

    if (song.getId() <= 0) {
      result.addMessage("id must be set for `update` operation", ResultType.INVALID);
      return result;
    }

    if (!repository.update(song)) {
      String msg = String.format("agencyId: %s, not found", song.getId());
      result.addMessage(msg, ResultType.NOT_FOUND);
    }

    return result;
  }

  public boolean deleteById(int id) {
    return repository.deleteById(id);
  }



}
