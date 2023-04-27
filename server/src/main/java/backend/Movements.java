package backend;

import java.sql.ResultSet;
import java.util.ArrayList;

public class Movements {

    private String name;
    private String type;
    private String category;
    private int pp;
    private int power;
    private int accuracy;
    private int priority;

    public Movements(String name, String type, String category,
    int pp, int power, int accuracy, int priority, int idMovement, ConnMysql conn) throws Exception {

        this.name = name;
        this.type = type;
        this.category = category;
        this.pp = pp;
        this.power = power;
        this.accuracy = accuracy;
        this.priority = priority;

    }

    public static ArrayList<PokemonsWhoLearnsMovements> getPokemonsWhoLearnsMovements(int idMovement, ConnMysql conn) throws Exception{
        ArrayList<PokemonsWhoLearnsMovements> pokemonsWhoLearnsMovements = new ArrayList<PokemonsWhoLearnsMovements>();
        String query = "SELECT pokemon.name AS name, learning_methods.name AS learn_method, level, pokemon.image AS image " +
         "FROM pokemon_learns_movement " +
         "LEFT JOIN pokemon ON pokemon_learns_movement.idPokemon = pokemon.idPokemon " +
         "LEFT JOIN learning_methods ON pokemon_learns_movement.idLearnMethod = learning_methods.idLearnMethod " +
         "WHERE idMovement = " + idMovement;
         ResultSet rs = conn.queryMysql(query);
         
         while(rs.next()){
            pokemonsWhoLearnsMovements.add(new PokemonsWhoLearnsMovements( rs.getString("name"),
                                                            rs.getString("learn_method"),
                                                            rs.getInt("level"),
                                                            rs.getString("image")));
         }
         return pokemonsWhoLearnsMovements;
    }


    /*Getters*/
    public String getName() {
        return name;
    }
    public String getType() {
        return type;
    }
    public String getCategory() {
        return category;
    }
    public int getPp() {
        return pp;
    }
    public int getPower() {
        return power;
    }
    public int getAccuracy() {
        return accuracy;
    }
    public int getPriority() {
        return priority;
    }

}
