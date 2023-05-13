package backend;

public class Type {

    private String id;
    private String name;
    private String damage_relations;
    private String picture;

    public Type(String id, String name, String picture, ConnMysql conn) throws Exception{
        this.id = id;
        this.name = name;
        this.damage_relations = new DamageRelations().build_damage_SQL(conn, name);
        this.picture = picture;
    }

    public Type(String name, String picture){
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

    public String getDamageRelations() {
        return damage_relations;
    }

}
