package learn.taylor_swift.data;

import learn.taylor_swift.models.Gossip;

import java.util.List;

public interface GossipRepository {


    List<Gossip> findAll();
    Gossip add(Gossip gossip);

    boolean update(Gossip gossip);

    boolean deleteByKey(int id);

    Gossip findById(int id);
}
