package learn.taylor_swift.data;

import learn.taylor_swift.models.Gossip;

import java.util.List;

public interface GossipRepository {


    List<Gossip> findAll();
    int add(Gossip gossip);

    boolean update(Gossip gossip);

    boolean deleteByKey(int id);
}
