package learn.taylor_swift.models;

public class Gossip {

    private int id;
    private String deets;

    public Gossip() {

    }

    public Gossip(int id, String deets) {
        this.id = id;
        this.deets = deets;

    }

    public Gossip(String id, String deets) {

    }

    public int getId() {
        return id;
    }



    public void setId(int id) {
        this.id = id;
    }

    public String getDeets() {
        return deets;
    }

    public void setDeets(String deets) {
        this.deets = deets;
    }




}
