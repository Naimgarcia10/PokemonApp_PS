package backend;

public class Types {

    private String id;
    private String name;
    private DamageRelations damage_relations;
    private String picture;

    public Types(String id, String name, String picture, ConnMysql conn) throws Exception{
        this.id = id;
        this.name = name;
        this.damage_relations = new DamageRelations(Integer.parseInt(id), conn);
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

    public DamageRelations getDamageRelations() {
        return damage_relations;
    }

}
