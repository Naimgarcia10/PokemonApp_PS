package backend;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class Pokemon {
    private int idPokemon;
    private String name;
    private String ability1;
    private String ability2;
    private String ability3;
    private String type1;
    private String type2;
    private String hp_base;
    private String attack_base;
    private String defense_base;
    private String spatk_base;
    private String spdef_base;
    private String speed_base;
    private String image;
    private List<PokemonMove> pokemonMoves;
    //private PokemonStrategies pokemonStrategies;
    private PokemonWeaknesses pokemonWeaknesses;
    
    public Pokemon(int idPokemon, String name, int idAbility1, int idAbility2, int idAbility3, int idType1,
            int idType2, String hp_base, String attack_base, String defense_base, String spatk_base, String spdef_base,
            String speed_base, String image, ConnMysql conn) throws Exception{

        this.idPokemon = idPokemon;
        this.name = name;
        this.ability1 = buildAbility(idAbility1, conn);
        this.ability2 = buildAbility(idAbility2, conn);
        this.ability3 = buildAbility(idAbility3, conn);
        this.type1 = buildType(idType1, conn);
        this.type2 = buildType(idType2, conn);
        this.hp_base = hp_base;
        this.attack_base = attack_base;
        this.defense_base = defense_base;
        this.spatk_base = spatk_base;
        this.spdef_base = spdef_base;
        this.speed_base = speed_base;
        this.image = image;
        this.pokemonMoves = buildPokemonMoves(idPokemon, conn);
        //this.pokemonStrategies = new;
        //this.pokemonWeaknesses = buildPokemonWeaknesses();

    }

    public static String buildType(int idType, ConnMysql conn) throws Exception{
        if(idType==0){return "";}
        String query = "SELECT picture FROM types WHERE idType = " + idType + ";";
        ResultSet rs = conn.queryMysql(query);
        rs.next();
        return rs.getString("picture");
    }

    private static String buildAbility(int idAbility, ConnMysql conn) throws Exception {
        if (idAbility == 0){return "";}
        String query = "SELECT name FROM abilities WHERE idAbility = " + idAbility + ";";
        ResultSet rs = conn.queryMysql(query);
        rs.next();
        return rs.getString("name");
    }

    private static List<PokemonMove> buildPokemonMoves(int idPokemon, ConnMysql conn) throws Exception{

        String query = "SELECT movements.name AS movement_name, types.name AS type_name, movement_class.name AS class_name " +
        "FROM movements " +  
        "INNER JOIN pokemon_learns_movement ON movements.idMovement = pokemon_learns_movement.idMovement " +
        "INNER JOIN types ON movements.idType = types.idType " +
        "INNER JOIN movement_class ON movements.idClass = movement_class.idClass " +
        "WHERE pokemon_learns_movement.idPokemon = " + idPokemon + ";";
        ResultSet rs = conn.queryMysql(query);
        ArrayList<PokemonMove> pokemonMoves = new ArrayList<>();

        while(rs.next()){
            String name = rs.getString("movement_name");
            String typeName = rs.getString("type_name");
            String className = rs.getString("class_name");
            PokemonMove pokemonMove = new PokemonMove(name, typeName, className);
            pokemonMoves.add(pokemonMove);
        }
        return pokemonMoves;
    }

    /*private PokemonStrategies buildPokemonStrategies(){
        return new PokemonStrategies(this.idPokemon);
    }*/

    /*private PokemonWeaknesses buildPokemonWeaknesses(){

        return new PokemonWeaknesses(this.idPokemon);
    }*/



    public int getIdPokemon() {
        return idPokemon;
    }

    public String getName() {
        return name;
    }

    public String getAbility1() {
        return ability1;
    }

    public String getAbility2() {
        return ability2;
    }

    public String getAbility3() {
        return ability3;
    }

    public String getType1() {
        return type1;
    }

    public String getType2() {
        return type2;
    }

    public String getHp_base() {
        return hp_base;
    }

    public String getAttack_base() {
        return attack_base;
    }

    public String getDefense_base() {
        return defense_base;
    }

    public String getSpatk_base() {
        return spatk_base;
    }

    public String getSpdef_base() {
        return spdef_base;
    }

    public String getSpeed_base() {
        return speed_base;
    }

    /*public PokemonStrategies getPokemonStrategies() {
        return pokemonStrategies;
    }*/

    public PokemonWeaknesses getPokemonWeaknesses() {
        return pokemonWeaknesses;
    }

    public String getImage() {
        return image;
    }

    public List<PokemonMove> getPokemonMoves() {
        return pokemonMoves;
    }
    
    
}
