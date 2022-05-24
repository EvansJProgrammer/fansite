package learn.taylor_swift.data;

import learn.taylor_swift.data.mappers.GossipMapper;
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
public class GossipJdbcRepository implements GossipRepository {

    private final JdbcTemplate jdbcTemplate;

    public GossipJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Gossip> findAll() {
        final String sql = "select * from gossip";
        return jdbcTemplate.query(sql, new GossipMapper());
    }

    @Override
    public Gossip add(Gossip gossip) {

        final String sql = "insert into gossip (deets) values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, gossip.getDeets());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        gossip.setId(keyHolder.getKey().intValue());
        return gossip;
    }

    @Override
    public boolean update(Gossip gossip) {

        final String sql = "update gossip set "
                + "deets = ? where id = ? ";

        return jdbcTemplate.update(sql,
                gossip.getDeets(),
                gossip.getId()) > 0;

    }

    @Override
    public boolean deleteByKey(int id) {

        final String sql = "delete from gossip where id = ?;";
<<<<<<< HEAD
=======

>>>>>>> 8340b78 (Gossip Service test)
        return jdbcTemplate.update(sql, id) > 0;
    }

}
