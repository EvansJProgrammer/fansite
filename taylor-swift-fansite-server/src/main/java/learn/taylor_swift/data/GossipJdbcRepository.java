package learn.taylor_swift.data;

import learn.taylor_swift.models.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class GossipJdbcRepository implements GossipRepository {

    private final JdbcTemplate jdbcTemplate;

    public GossipJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int add(Gossip gossip) {

        final String sql = "insert into gossip (id, deets) values (?,?);";

        return jdbcTemplate.update(sql,
                gossip.getId(),
                gossip.getDeets());
    }

    @Override
    public boolean update(Gossip gossip) {

        final String sql = "update gossip set "
                + "id = ?, "
                + "deets = ? ";

        return jdbcTemplate.update(sql,
                gossip.getId(),
                gossip.getDeets()) > 0;
    }

    @Override
    public boolean deleteByKey(int id) {

        final String sql = "delete from id"
                + "where id = ?;";

        return jdbcTemplate.update(sql, id) > 0;
    }

}
