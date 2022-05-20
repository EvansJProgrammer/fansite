package learn.taylor_swift.models;

public class Song {
    private int id;
    private String title;
    private String length;
    private String youTubeUrl;
    private String spotifyUrl;
    private int releaseYear;

    public Song(int id, String title, String length, String youTubeUrl, String spotifyUrl, int releaseYear) {
        this.id = id;
        this.title = title;
        this.length = length;
        this.youTubeUrl = youTubeUrl;
        this.spotifyUrl = spotifyUrl;
        this.releaseYear = releaseYear;
    }

    public Song() {

    }

    public Song(String id, String title, int length, String youTubeUrl, String spotifyUrl, int releaseYear){

    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getYouTubeUrl() {
        return youTubeUrl;
    }

    public void setYouTubeUrl(String youTubeUrl) {
        this.youTubeUrl = youTubeUrl;
    }

    public String getSpotifyUrl() {
        return spotifyUrl;
    }

    public void setSpotifyUrl(String spotifyUrl) {
        this.spotifyUrl = spotifyUrl;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }


}
