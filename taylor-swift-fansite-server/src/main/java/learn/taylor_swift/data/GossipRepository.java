package learn.taylor_swift.data;

import learn.taylor_swift.models.Gossip;

public interface GossipRepository {

    int add(Gossip gossip);

    boolean update(Gossip gossip);

    boolean deleteByKey(int id);
}
