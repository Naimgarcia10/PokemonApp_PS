package backend;

public class Types {

    private String id;
    private String name;
    private String picture;

    public Types(String id, String name, String picture){
        this.id = id;
        this.name = name;
        this.picture = picture;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPicture() {
        return picture;
    }

    
    
}
