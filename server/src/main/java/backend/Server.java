package backend;

import spark.Spark;
import java.sql.*;
import java.util.ArrayList;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class Server {

    // Configuración del servidor, puerto y carpeta de archivos estáticos
    private static void config() {
        Spark.staticFiles.location("");
        Spark.port(8080);
    }

    // Redireccionamiento a la página de inicio
    private static void redirect() {
        Spark.get("/", (req, res) -> {
            res.redirect("/html/home.html");
            return "";
        });
    }

    // Tutorial
    private static void attendTutorialRequest() {
        Spark.get("/tutorial/:index", (rq, rs) -> {
            String param = rq.params(":index");
            int index = Integer.parseInt(param);
            return JsonTutorial.get_tutorial(index);
        });
    }

    // Types
    private static void attendTypesRequest(ConnMysql conn) {
        Spark.get("/getTypes", (req, res) -> {
            return new DamageRelations().build_damage_SQL(conn);
        });
    }

    // Glossary
    private static void attendGlossaryRequest(ConnMysql conn) {
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
    }

    // Buscador Pokemon
    private static void attendPokemonSearcher(ConnMysql conn) {
        Spark.get("/getPokemon/:pokemonName", (rq, res) -> {
            String pokemonName = rq.params(":pokemonName");
            String query = "SELECT idPokemon, pokemon.name, a1.name as ability1, " +
                    "a2.name as ability2, a3.name as ability3, t1.picture as type1, " +
                    "t2.picture as type2, hpBase, attackBase, defenseBase, spatkBase, " +
                    "spdefBase, speedBase, image FROM pokemon JOIN abilities a1 on " +
                    "a1.idAbility = idAbility1 LEFT JOIN abilities a2 on " +
                    "a2.idAbility = idAbility2 LEFT JOIN abilities a3 on " +
                    "a3.idAbility = idAbility3 JOIN types t1 on t1.idType = " +
                    "pokemon.idType1 LEFT JOIN types t2 on t2.idType = pokemon.idType2 " +
                    "where pokemon.name = \"" + pokemonName + "\";";
            ResultSet rs = conn.queryMysql(query);
            rs.next();
            Gson gson = new GsonBuilder().serializeNulls().create();
            ArrayList<Pokemon> array = new ArrayList<>();
            Pokemon pokemon = new Pokemon(rs.getInt("idPokemon"),
                    rs.getString("name"),
                    rs.getString("ability1"),
                    rs.getString("ability2"),
                    rs.getString("ability3"),
                    rs.getString("type1"),
                    rs.getString("type2"),
                    rs.getInt("hpBase"),
                    rs.getInt("attackBase"),
                    rs.getInt("defenseBase"),
                    rs.getInt("spatkBase"),
                    rs.getInt("spdefBase"),
                    rs.getInt("speedBase"),
                    rs.getString("image"));
            pokemon.buildPokemonMoves(conn);
            pokemon.buildStrategies(conn);
            pokemon.buildWeaknesses(conn);
            array.add(pokemon);
            return gson.toJson(array);
        });
    }

    // Buscador Objetos
    private static void attendPokemonItemSearcher(ConnMysql conn) {
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
    }

    // Buscador de movimiento pokemon
    private static void attendPokemonMovementSearcher(ConnMysql conn) {
        Spark.get("/getMovements", (req, res) -> {
            String query = "SELECT idMovement, movements.name, types.name AS type, movement_class.name AS category, pp, power, accuracy, priority "
                    +
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
    }

    // PokemonWhoLearnsMovements
    private static void attendPokemonWhoLearnsMovements(ConnMysql conn) {
        Spark.get("/getPokemonsWhoLearnsMovements/:idMovement", (rq, rs) -> {
            Gson gson = new GsonBuilder().create();
            String idMovement = rq.params(":idMovement");
            String result = gson.toJson(Movements.getPokemonsWhoLearnsMovements(Integer.parseInt(idMovement), conn));
            return result;
        });
    }

    // GetAbility
    private static void attendPokemonAbilitySearcher(ConnMysql conn) {
        Spark.get("/getAbilities", (req, res) -> {
            Gson gson = new GsonBuilder().create();
            String query = "SELECT idAbility, name, description FROM abilities";
            ResultSet rs = conn.queryMysql(query);
            ArrayList<Abilities> listaHabilidades = new ArrayList<>();
            while (rs.next()) {
                Abilities ability = new Abilities(rs.getInt("idAbility"), rs.getString("name"),
                        rs.getString("description"));
                listaHabilidades.add(ability);
            }
            String result = gson.toJson(listaHabilidades);
            return result;
        });
    }

    // PokemonWhoLearnsAbilities
    private static void attendPokemonWhoLearnsAbilities(ConnMysql conn) {
        Spark.get("/getPokemonsWhoLearnsAbilities/:idAbility", (req, res) -> {
            Gson gson = new GsonBuilder().create();
            int idAbility = Integer.parseInt(req.params(":idAbility"));
            String query = "SELECT pokemon.name, pokemon.image, pokemon.idAbility1, pokemon.idAbility2, pokemon.idAbility3 "
                    +
                    "FROM pokemon JOIN abilities on abilities.idAbility = pokemon.idAbility1 " +
                    String.format("WHERE idAbility = %d OR idAbility2 = %d OR idAbility3 = %d;", idAbility, idAbility,
                            idAbility);
            ResultSet rs = conn.queryMysql(query);
            ArrayList<JsonObject> array = new ArrayList<>();
            while (rs.next()) {
                JsonObject jsonobject = new JsonObject();
                jsonobject.addProperty("name", rs.getString("name"));
                jsonobject.addProperty("image", rs.getString("image"));
                int ability1 = rs.getInt("idAbility1");
                int ability2 = rs.getInt("idAbility2");
                int ability3 = rs.getInt("idAbility3");
                String abilityType = "";
                if (ability1 == idAbility) {
                    abilityType = "First Ability";
                } else if (ability2 == idAbility) {
                    abilityType = "Second Ability";
                } else if (ability3 == idAbility) {
                    abilityType = "Hidden Ability";
                }
                jsonobject.addProperty("abilityType", abilityType);
                array.add(jsonobject);
            }
            String result = gson.toJson(array);
            return result;
        });
    }

    // Registro de usuarios
    private static void attendRegisterUserRequest(ConnMysql conn) {
        Spark.post("/register", (req, res) -> {
            System.out.println("hola");
            /*
             * String email = req.queryParams("email");
             * String username = req.queryParams("username");
             * 
             * String password = req.queryParams("password");
             * String birthdate = req.queryParams("birthdate");
             */

            JSONObject requestBody = new JSONObject(req.body());

            String username = requestBody.getString("username");
            String email = requestBody.getString("email");
            String birthdate = requestBody.getString("birthdate");
            String password = requestBody.getString("password");

            System.out.println("email: " + email + " username: " + username + " password: " + password + " birthdate: "
                    + birthdate);

            System.out.println("\n\n\nADIOS");

            // Verificar si el usuario ya existe en la base de datos
            String query = String.format("SELECT COUNT(*) FROM users WHERE email = '%s' OR username = '%s'", email,
                    username);
            ResultSet rs = conn.queryMysql(query);
            rs.next();
            int count = rs.getInt(1);
            System.out.println("cuenta" + count);
            if (count > 0) {
                res.status(409); // Código de respuesta para conflicto
                return "El usuario ya existe en la base de datos";
            }

            // Insertar usuario en la base de datos
            query = String.format(
                    "INSERT INTO users (email, username, password, birthdayDate) VALUES ('%s', '%s', '%s', '%s')",
                    email, username, password, birthdate);
            conn.queryMysql(query);

            System.out.println("hola pedro proando");

            res.status(200);
            return "Usuario registrado correctamente";
        });
    }

    public static void main(String[] args) throws Exception {
        ConnMysql conn = new ConnMysql();
        Server.config();
        Server.redirect();
        Server.attendTutorialRequest();
        Server.attendTypesRequest(conn);
        Server.attendGlossaryRequest(conn);
        Server.attendPokemonSearcher(conn);
        Server.attendPokemonItemSearcher(conn);
        Server.attendPokemonMovementSearcher(conn);
        Server.attendPokemonWhoLearnsMovements(conn);
        Server.attendPokemonAbilitySearcher(conn);
        Server.attendPokemonWhoLearnsAbilities(conn);
        Server.attendRegisterUserRequest(conn);
    }

}
