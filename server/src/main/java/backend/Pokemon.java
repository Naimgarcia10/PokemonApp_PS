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
    private Type type1;
    private Type type2;
    private int hp_base;
    private int attack_base;
    private int defense_base;
    private int spatk_base;
    private int spdef_base;
    private int speed_base;
    private String image;
    private List<PokemonMove> pokemonMoves;
    private List<Strategy> pokemonStrategies;
    private DoubleTypeDamageRelations pokemonWeaknesses;
    
    public Pokemon(int idPokemon, String name, String ability1, String ability2, String ability3, Type type1,
            Type type2, int hp_base, int attack_base, int defense_base, int spatk_base, int spdef_base,
            int speed_base, String image) throws Exception{

        this.idPokemon = idPokemon;
        this.name = name;
        this.ability1 = ability1;
        this.ability2 = ability2;
        this.ability3 = ability3;
        this.type1 = type1;
        this.type2 = type2;
        this.hp_base = hp_base;
        this.attack_base = attack_base;
        this.defense_base = defense_base;
        this.spatk_base = spatk_base;
        this.spdef_base = spdef_base;
        this.speed_base = speed_base;
        this.image = image;
        this.pokemonMoves = null;
        this.pokemonStrategies = null;
        this.pokemonWeaknesses = null;
    }

    public void buildPokemonMoves(ConnMysql conn) throws Exception{

        String query = "SELECT movements.name AS movement_name, types.name AS type_name, types.picture AS type_picture, movement_class.icon AS class_icon, movements.accuracy, movements.description, movements.power, movements.pp, movements.priority " +
        "FROM movements " +  
        "INNER JOIN pokemon_learns_movement ON movements.idMovement = pokemon_learns_movement.idMovement " +
        "INNER JOIN types ON movements.idType = types.idType " +
        "INNER JOIN movement_class ON movements.idClass = movement_class.idClass " +
        "WHERE pokemon_learns_movement.idPokemon = " + idPokemon + ";";
        ResultSet rs = conn.queryMysql(query);
        ArrayList<PokemonMove> pokemonMoves = new ArrayList<>();

        while(rs.next()){
            String name = rs.getString("movement_name");
            Type type = new Type(rs.getString("type_name"), rs.getString("type_picture"));
            String classIcon = rs.getString("class_icon");
            String description = rs.getString("description");
            int power = rs.getInt("power");
            int accuracy = rs.getInt("accuracy");
            int pp = rs.getInt("pp");
            int priority = rs.getInt("priority");
            PokemonMove pokemonMove = new PokemonMove(name, description, type, classIcon, power, accuracy, pp, priority);
            pokemonMoves.add(pokemonMove);
        }
        this.pokemonMoves = pokemonMoves;
    }

    public void buildStrategies(ConnMysql conn) throws Exception{        

        String query = String.format("SELECT strategies.name, strategies.description, abilities.name as ability, " +
                                    "m1.name as move1name, t1.picture as move1type, m1.pp as move1pp, " +
                                    "m2.name as move2name, t2.picture as move2type, m2.pp as move2pp, " +
                                    "m3.name as move3name, t3.picture as move3type, m3.pp as move3pp, " +
                                    "m4.name as move4name, t4.picture as move4type, m4.pp as move4pp, " +
                                    "objects.name as itemName, objects.icon as itemPicture, " +
                                    "natures.name as nature, " +
                                    "evsHp, evsAttack, evsDefense, evsSpatk, evsSpdef, evsSpeed " +
                                    "FROM strategies " +
                                    "LEFT JOIN abilities on abilities.idAbility = strategies.idAbility " +
                                    "LEFT JOIN movements m1 on m1.idMovement = strategies.idMovement1 LEFT JOIN types t1 on t1.idType = m1.idType " +
                                    "LEFT JOIN movements m2 on m2.idMovement = strategies.idMovement2 LEFT JOIN types t2 on t2.idType = m2.idType " +
                                    "LEFT JOIN movements m3 on m3.idMovement = strategies.idMovement3 LEFT JOIN types t3 on t3.idType = m3.idType " +
                                    "LEFT JOIN movements m4 on m4.idMovement = strategies.idMovement4 LEFT JOIN types t4 on t4.idType = m4.idType " +
                                    "LEFT JOIN objects on objects.idObject = strategies.idItem " +
                                    "LEFT JOIN natures on natures.idNature = strategies.idNature " +
                                    "where idPokemon = %d;", idPokemon);        
        ResultSet rs = conn.queryMysql(query);
        List<Strategy> strategies = new ArrayList<Strategy>();
        while (rs.next()) {
            Strategy strategy = new Strategy(rs.getString("name"), rs.getString("description"), rs.getString("ability"), rs.getString("move1name"), rs.getString("move1type"),
            rs.getInt("move1pp"), rs.getString("move2name"), rs.getString("move2type"), rs.getInt("move2pp"), rs.getString("move3name"), rs.getString("move3type"), rs.getInt("move3pp"),
            rs.getString("move4name"), rs.getString("move4type"), rs.getInt("move4pp"), rs.getString("itemName"), rs.getString("itemPicture"), rs.getString("nature"),
            rs.getInt("evsHp"), rs.getInt("evsAttack"), rs.getInt("evsDefense"), rs.getInt("evsSpatk"), rs.getInt("evsSpdef"), rs.getInt("evsSpeed"));
            strategies.add(strategy);
        }
        this.pokemonStrategies = strategies;
    }

    public void buildWeaknesses(ConnMysql conn) throws Exception{
        String type1Picture = type1.getPicture();
        String type2Picture = (type2 != null) ? type2.getPicture() : null;
        pokemonWeaknesses = DamageRelations.getDoubleWeaknesses(type1Picture, type2Picture, conn);  
    }
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

    public Type getType1() {
        return type1;
    }

    public Type getType2() {
        return type2;
    }

    public int getHp_base() {
        return hp_base;
    }

    public int getAttack_base() {
        return attack_base;
    }

    public int getDefense_base() {
        return defense_base;
    }

    public int getSpatk_base() {
        return spatk_base;
    }

    public int getSpdef_base() {
        return spdef_base;
    }

    public int getSpeed_base() {
        return speed_base;
    }

    public List<Strategy> getPokemonStrategies() {
        return pokemonStrategies;
    }

    public DoubleTypeDamageRelations getPokemonWeaknesses() {
        return pokemonWeaknesses;
    }

    public String getImage() {
        return image;
    }

    public List<PokemonMove> getPokemonMoves() {
        return pokemonMoves;
    }
        
}
