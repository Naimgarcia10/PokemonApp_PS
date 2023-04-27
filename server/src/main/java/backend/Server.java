package backend;

import spark.Spark;
import java.sql.*;
import java.util.ArrayList;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Server {

    public static void main(String[] args) throws Exception {

        ConnMysql conn = new ConnMysql();
        Spark.staticFiles.location("");
        Spark.port(8080);

        Spark.get("/", (req, res) -> {
            res.redirect("/html/home.html");
            return "";
        });

        Spark.get("/tutorial/:index", (rq, rs) -> {
            String param = rq.params(":index");
            int index = Integer.parseInt(param);
            return JsonTutorial.get_tutorial(index);
        });

        Spark.get("/getItems", (req, res) -> {

            String query = "SELECT name, description, icon FROM objects";
            ResultSet rs = conn.queryMysql(query);
            Gson gson = new GsonBuilder().create();
            ArrayList<Items> array = new ArrayList<>();

            while (rs.next()) {
                Items item = new Items(rs.getString("name"), rs.getString("description"), rs.getString("icon"));
                array.add(item);
            }

            return gson.toJson(array);

        });

        Spark.get("/getAbilities", (req, res) -> {

            String query = "SELECT name, description FROM abilities";
            ResultSet rs = conn.queryMysql(query);
            Gson gson = new GsonBuilder().create();
            ArrayList<Abilities> array = new ArrayList<>();

            while (rs.next()) {
                Abilities item = new Abilities(rs.getString("name"), rs.getString("description"));
                array.add(item);
            }

            return gson.toJson(array);

        });

        Spark.get("/getTerms", (req, res) -> {

            String query = "SELECT name, description FROM terms";
            ResultSet rs = conn.queryMysql(query);
            Gson gson = new GsonBuilder().create();
            ArrayList<Terms> array = new ArrayList<>();

            while (rs.next()) {
                Terms item = new Terms(rs.getString("name"), rs.getString("description"));
                array.add(item);
            }

            return gson.toJson(array);

        });

        Spark.get("/getTypes", (req, res) -> {

            String query = "SELECT idType, name, picture FROM types";
            ResultSet rs = conn.queryMysql(query);
            Gson gson = new GsonBuilder().create();
            ArrayList<Types> array = new ArrayList<>();
            while (rs.next()) {
                Types item = new Types(rs.getString("idType"),
                             rs.getString("name"),
                             rs.getString("picture"),
                             conn);

                array.add(item);
            }
            return gson.toJson(array);
        });

        Spark.get("/getMovements", (req, res) -> {

            String query = "SELECT idMovement, movements.name, types.name AS type, movement_class.name AS category, pp, power, accuracy, priority " +
            "FROM movements " +
            "LEFT JOIN types ON movements.idType = types.idType " +
            "LEFT JOIN movement_class ON movements.idClass = movement_class.idClass";

            ResultSet rs = conn.queryMysql(query);
            Gson gson = new GsonBuilder().serializeNulls().create();
            ArrayList<Movements> array = new ArrayList<>();

            while (rs.next()) {
                Movements item = new Movements(rs.getString("name"),
                                rs.getString("type"),
                                rs.getString("category"),
                                rs.getInt("pp"),
                                rs.getInt("power"),
                                rs.getInt("accuracy"),
                                rs.getInt("priority"),
                                rs.getInt("idMovement"),
                                conn);
                array.add(item);
            }
            return gson.toJson(array);
        });

        Spark.get("/getPokemonsWhoLearnsMovements/:idMovement", (rq, rs) -> {
            Gson gson = new GsonBuilder().create();
            String idMovement = rq.params(":idMovement");
            String result = gson.toJson(Movements.getPokemonsWhoLearnsMovements(Integer.parseInt(idMovement), conn));
            return result;
        });

        Spark.get("/getPokemon/:index", (rq, res) -> {
            String pokemonName = rq.params(":index");
            String query = "SELECT * FROM pokemon WHERE name = \"" + pokemonName + "\"";
            ResultSet rs = conn.queryMysql(query);
            rs.next();
            Gson gson = new GsonBuilder().create();
            ArrayList<Pokemon> array = new ArrayList<>();
            Pokemon pokemon = new Pokemon(rs.getInt("idPokemon")
                                        , rs.getString("name")
                                        , rs.getInt("idAbility1")
                                        , rs.getInt("idAbility2")
                                        , rs.getInt("idAbility3")
                                        , rs.getInt("idType1")
                                        , rs.getInt("idType2")
                                        , rs.getString("hpBase")
                                        , rs.getString("attackBase")
                                        , rs.getString("defenseBase")
                                        , rs.getString("spatkBase")
                                        , rs.getString("spdefBase")
                                        , rs.getString("speedBase")
                                        , rs.getString("image")
                                        , conn
                                        );
            array.add(pokemon);
            return gson.toJson(array);
        });

    }

}
