package learn.taylor_swift.data.mappers;

import learn.taylor_swift.models.Song;
import learn.taylor_swift.models.Gossip;

import javax.swing.tree.TreePath;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;


public class GossipMapper implements RowMapper<Gossip> {
    @Override
    public Gossip mapRow(ResultSet resultSet, int i) throws SQLException {
        Gossip gossip = new Gossip();
        gossip.setId(resultSet.getInt("id"));
        gossip.setDeets(resultSet.getString("deets"));
        return gossip;
    }
}