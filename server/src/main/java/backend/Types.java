package backend;

public class Types {

    private String id;
    private String name;
    private String damage_relations;
    private String picture;

    public Types(String id, String name, String picture, ConnMysql conn) throws Exception{
        this.id = id;
        this.name = name;
        this.damage_relations = new DamageRelations().build_damage_SQL(conn);
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

    public String getDamageRelations() {
        return damage_relations;
    }

}
