package backend;

import io.github.cdimascio.dotenv.Dotenv;
import spark.Spark;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

import org.json.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class Server {
    private static void returnCards(ConnMysql conn) {
        Spark.get("/getCards/:username", (rq, rs) -> {
            String param = rq.params(":username");                        
            String query = "SELECT idCustomPokemon1, idCustomPokemon2, idCustomPokemon3, idCustomPokemon4, idCustomPokemon5, idCustomPokemon6 " + 
            "FROM pokemon_teams " +
            "WHERE idUser = (SELECT idUser FROM users WHERE username = '" + param + "');";            
            ResultSet result = conn.queryMysql(query);
            ArrayList<CustomPokemon> cards = new ArrayList<>();
            while (result.next()) {
                for (int i = 1; i <= 6; i++) {                    
                    int idCustomPokemon = result.getInt("idCustomPokemon" + i);
                    if (idCustomPokemon != 0) {
                        cards.add(getCustomPokemon(conn, idCustomPokemon));
                    }
                }
            }
            Gson gson = new GsonBuilder().serializeNulls().create();            
            String asdf = gson.toJson(cards);
            System.out.println("=====================================");
            System.out.println(asdf);
            System.out.println("=====================================");
            return asdf;            
        });
    }

    private static CustomPokemon getCustomPokemon(ConnMysql conn, int idCustomPokemon) throws Exception{
        String query = "SELECT pokemon.name, abilities.name as ability, natures.name as nature, objects.name as item, movs1.name as movement1, movs2.name as movement2, movs3.name as movement3, movs4.name as movement4, evsHp, evsAttack, evsDefense, evsSpatk, evsSpdef, evsSpeed, ivsHp, ivsAttack, ivsDefense, ivsSpatk, ivsSpdef, ivsSpeed, pokemon.image " +  
        "FROM custom_pokemons " +
        "INNER JOIN pokemon ON custom_pokemons.idPokemon = pokemon.idPokemon " + 
        "INNER JOIN abilities ON custom_pokemons.idAbility = abilities.idAbility " +
        "INNER JOIN natures ON custom_pokemons.idNature = natures.idNature " +
        "INNER JOIN objects ON custom_pokemons.idItem = objects.idObject " +
        "INNER JOIN movements movs1 ON custom_pokemons.idMovement1 = movs1.idMovement " +
        "INNER JOIN movements movs2 ON custom_pokemons.idMovement2 = movs2.idMovement " +
        "INNER JOIN movements movs3 ON custom_pokemons.idMovement3 = movs3.idMovement " +
        "INNER JOIN movements movs4 ON custom_pokemons.idMovement4 = movs4.idMovement " +         
        "WHERE idCustomPokemon = " + idCustomPokemon + ";";
        System.out.println("LA SENTENCIA QUE HACE QUE REVIENTE TODO ES: " + query);
        System.out.println("=====================================");
        ResultSet rs = conn.queryMysql(query);
        rs.next();        
        CustomPokemon custompokemon = new CustomPokemon(
        rs.getString("name"), 
        rs.getString("ability"),
        rs.getString("nature"),
        rs.getString("item"),
        rs.getString("movement1"),
        rs.getString("movement2"),
        rs.getString("movement3"),
        rs.getString("movement4"),
        rs.getInt("evsHp"),
        rs.getInt("evsAttack"),
        rs.getInt("evsDefense"),
        rs.getInt("evsSpatk"),
        rs.getInt("evsSpdef"),
        rs.getInt("evsSpeed"),
        rs.getInt("ivsHp"),
        rs.getInt("ivsAttack"),
        rs.getInt("ivsDefense"),
        rs.getInt("ivsSpatk"),
        rs.getInt("ivsSpdef"),
        rs.getInt("ivsSpeed"),
        rs.getString("image")
        );
        return custompokemon;
    }

    private static Connection connection() throws Exception {
        Dotenv dotenv = Dotenv.load();
        String DB_CONNECTION = "jdbc:mysql://";
        String DB_HOST = dotenv.get("DB_HOST");
        String DB_PORT = dotenv.get("DB_PORT");
        String DB_NAME = dotenv.get("DB_NAME");
        String url = DB_CONNECTION + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
        String user = dotenv.get("DB_USER");
        String password = dotenv.get("DB_PASSWORD");
        return DriverManager.getConnection(url, user, password);
    }

    private static void config() {
        Spark.staticFiles.location("");
        Spark.port(4200);
    }

    private static void redirect() {
        Spark.get("/", (req, res) -> {
            res.redirect("/html/home.html");
            return "";
        });
    }

    private static void attendTutorialRequest() {
        Spark.get("/tutorial/:index", (rq, rs) -> {
            String param = rq.params(":index");
            int index = Integer.parseInt(param);
            return JsonTutorial.get_tutorial(index);
        });
    }

    private static void attendTypesRequest(ConnMysql conn) {
        Spark.get("/getTypes", (req, res) -> {
            return new DamageRelations().build_damage_SQL(conn, null);
        });
    }

    //Type
    private static void attendTypeRequest(ConnMysql conn){                
        Spark.get("/getType/:type", (req, res) -> {
            String typeName = req.params(":type");
            return new DamageRelations().build_damage_SQL(conn, typeName);
        });
    }

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

    private static void attendPokemonSearcher(ConnMysql conn) {
        Spark.get("/getPokemon/:pokemonName", (rq, res) -> {
            String pokemonName = rq.params(":pokemonName");
            String query = "SELECT idPokemon, pokemon.name, a1.name as ability1, " +
            "a2.name as ability2, a3.name as ability3, t1.name as type1Name, t1.picture as type1Picture, " +
            "t2.name as type2Name, t2.picture as type2Picture, hpBase, attackBase, defenseBase, spatkBase, " +
            "spdefBase, speedBase, image, cry FROM pokemon JOIN abilities a1 on " +
            "a1.idAbility = idAbility1 LEFT JOIN abilities a2 on " +
            "a2.idAbility = idAbility2 LEFT JOIN abilities a3 on " +
            "a3.idAbility = idAbility3 JOIN types t1 on t1.idType = " +
            "pokemon.idType1 LEFT JOIN types t2 on t2.idType = pokemon.idType2 " +
            "where pokemon.name = \"" + pokemonName + "\";";            
            ResultSet rs = conn.queryMysql(query);            
            Gson gson = new GsonBuilder().serializeNulls().create();
            ArrayList<Pokemon> array = new ArrayList<>();        
            Pokemon pokemon = null;
            if(rs.next()){
                pokemon = new Pokemon(rs.getInt("idPokemon"), 
                                        rs.getString("name"), 
                                        rs.getString("ability1"), 
                                        rs.getString("ability2"), 
                                        rs.getString("ability3"), 
                                        new Type(rs.getString("type1Name"), rs.getString("type1Picture")),
                                        rs.getString("type2Name") == null ? null : new Type(rs.getString("type2Name"), rs.getString("type2Picture")),
                                        rs.getInt("hpBase"), 
                                        rs.getInt("attackBase"), 
                                        rs.getInt("defenseBase"), 
                                        rs.getInt("spatkBase"), 
                                        rs.getInt("spdefBase"), 
                                        rs.getInt("speedBase"), 
                                        rs.getString("image"),
                                        rs.getString("cry"));            
            pokemon.buildPokemonMoves(conn);
            pokemon.buildStrategies(conn);
            pokemon.buildWeaknesses(conn);  
            }        
            if(pokemon != null) array.add(pokemon);
            return gson.toJson(array);
        });
    }

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

    private static void attendPokemonWhoLearnsMovements(ConnMysql conn) {
        Spark.get("/getPokemonsWhoLearnsMovements/:idMovement", (rq, rs) -> {
            Gson gson = new GsonBuilder().create();
            String idMovement = rq.params(":idMovement");
            String result = gson.toJson(Movements.getPokemonsWhoLearnsMovements(Integer.parseInt(idMovement), conn));
            return result;
        });
    }

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

    private static void getPokemonsName(ConnMysql conn) {
        Spark.get("/getPokemonsName", (req, res) -> {
            Gson gson = new GsonBuilder().create();
            String query = "SELECT name FROM pokemon";
            ResultSet rs = conn.queryMysql(query);
            ArrayList<String> listaPokemons = new ArrayList<>();
            while (rs.next()) {
                listaPokemons.add(rs.getString("name"));
            }
            String result = gson.toJson(listaPokemons);
            return result;
        });
    }

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


    private static void sendEmail() {
        Spark.get("/sendEmail", (req, res) -> {
    
            final String username = "pokemonpsapp@gmail.com";
            final String password = "vvaf fyfp grxk bdgb"; // replace with your actual password
    
            String to = req.queryParams("to");
            String subject = req.queryParams("subject");
            String body = req.queryParams("body");
    
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.port", "587");
    
            Session session = Session.getInstance(props,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(username, password);
                        }
                    });
    
            try {
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(username));
                message.setRecipients(Message.RecipientType.TO,
                        InternetAddress.parse(to));
                message.setSubject(subject);
                message.setText(body);
    
                Transport.send(message);
    
                System.out.println("Done");
    
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
            return "Email sent.";
        });
    }

    private static void getNatures(ConnMysql conn) {
        Spark.get("/getNatures", (req, res) -> {
            Gson gson = new GsonBuilder().create();
            String query = "SELECT name FROM natures";
            ResultSet rs = conn.queryMysql(query);
            ArrayList<String> listaNaturalezas = new ArrayList<>();
            while (rs.next()) {
                String nature = rs.getString("name");
                listaNaturalezas.add(nature);
            }
            String result = gson.toJson(listaNaturalezas);
            return result;
        });
    }

    private static void getIdByEmail(ConnMysql conn) {
        Spark.get("/getIdByEmail/:email", (req, res) -> {
            Gson gson = new GsonBuilder().create();
            String email = req.params(":email");
            String query = "SELECT idUser FROM users WHERE email = '" + email + "'";
            ResultSet rs = conn.queryMysql(query);
            int idUser = -1;
            if (rs.next()) {
                idUser = rs.getInt("idUser");
            }
            String result = gson.toJson(idUser);
            return result;
        });
    }

    private static void getPokemonCardById(Connection conn) {
        Spark.get("/getPokemonCardById/:id", (req, res) -> {
            int idPokemon = Integer.parseInt(req.params(":id"));
            Gson gson = new GsonBuilder().create();
            String query = "SELECT name, image, idPokemon FROM pokemon WHERE idPokemon = ?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1, idPokemon);
            ResultSet rs = stmt.executeQuery();
            HashMap<String, String> pokemonCard = new HashMap<>();
            if (rs.next()) {
                pokemonCard.put("name", rs.getString("name"));
                pokemonCard.put("image", rs.getString("image"));
                pokemonCard.put("idPokemon", rs.getString("idPokemon"));
            }
            String result = gson.toJson(pokemonCard);
            return result;
        });
    }
   
    private static void getIdByName(Connection conn) {
        Spark.get("/getIdByName/:name", (req, res) -> {
            HashMap<String, Integer> idPokemon = new HashMap<>();
            try {
                String name = req.params(":name");
                String query = "SELECT idPokemon FROM pokemon WHERE name = ?";
                PreparedStatement stmt = conn.prepareStatement(query);
                stmt.setString(1, name);
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    idPokemon.put("idPokemon", rs.getInt("idPokemon"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return new GsonBuilder().create().toJson(idPokemon);
        });
    }

    private static void postTeam(Connection conn) {
        Spark.post("/postTeam/:username", (rq, res) -> {
            String username = rq.params(":username");
            String body = rq.body();            
            Gson gson = new Gson();
            JsonArray pokemons = gson.fromJson(body, JsonArray.class);
            String query = "";
            int counter = 0;
            Integer[] idCustomPokemons = new Integer[6];       
            for (JsonElement element : pokemons) {
                JsonObject pokemon = element.getAsJsonObject();
                
                // CADA VEZ QUE LLAMO A POST TEAM, CREO NUEVAS FILAS
                // HAY QUE HACER QUE SE ACTUALICEN EN VEZ DE CREAR NUEVAS
                
                query = String.format(
                "INSERT INTO custom_pokemons(idPokemon, idAbility, idNature, idItem, idMovement1, idMovement2, idMovement3, idMovement4, evsHp, evsAttack, evsDefense, evsSpatk, evsSpdef, evsSpeed, ivsHp, ivsAttack, ivsDefense, ivsSpatk, ivsSpdef, ivsSpeed)" +
                "SELECT " + 
                "(SELECT idPokemon FROM pokemon WHERE pokemon.name = '%s'), " + //idPokemon
                "(SELECT idAbility FROM abilities WHERE abilities.name = '%s'), " + //idAbility
                "(SELECT idNature FROM natures WHERE natures.name = '%s'), " + //idNature
                "(SELECT idObject FROM objects WHERE objects.name = '%s'), " + //idItem
                "(SELECT idMovement FROM movements WHERE movements.name = '%s'), " + //idMovement1
                "(SELECT idMovement FROM movements WHERE movements.name = '%s'), " + //idMovement2
                "(SELECT idMovement FROM movements WHERE movements.name = '%s'), " + //idMovement3
                "(SELECT idMovement FROM movements WHERE movements.name = '%s'), " + //idMovement4
                "%d, " + //evsHp
                "%d, " + //evsAttack
                "%d, " + //evsDefense
                "%d, " + //evsSpatk
                "%d, " + //evsSpdef
                "%d, " + //evsSpeed
                "%d, " + //ivsHp
                "%d, " + //ivsAttack
                "%d, " + //ivsDefense
                "%d, " + //ivsSpatk
                "%d, " + //ivsSpdef
                "%d", //ivsSpeed
                pokemon.get("name").getAsString(),
                pokemon.get("ability").getAsString(),
                pokemon.get("nature").getAsString(),
                pokemon.get("item").getAsString(),
                pokemon.get("movement1").getAsString(),
                pokemon.get("movement2").getAsString(),
                pokemon.get("movement3").getAsString(),
                pokemon.get("movement4").getAsString(),
                pokemon.get("evsHp").getAsInt(),
                pokemon.get("evsAttack").getAsInt(),
                pokemon.get("evsDefense").getAsInt(),
                pokemon.get("evsSpatk").getAsInt(),
                pokemon.get("evsSpdef").getAsInt(),
                pokemon.get("evsSpeed").getAsInt(),
                pokemon.get("ivsHp").getAsInt(),
                pokemon.get("ivsAttack").getAsInt(),
                pokemon.get("ivsDefense").getAsInt(),
                pokemon.get("ivsSpatk").getAsInt(),
                pokemon.get("ivsSpdef").getAsInt(),
                pokemon.get("ivsSpeed").getAsInt()
                );
                PreparedStatement stmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
                stmt.executeUpdate();

                ResultSet generatedKeys = stmt.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int generatedId = generatedKeys.getInt(1);
                    // Aquí puedes utilizar la ID generada como necesites
                    System.out.println("ID generada: " + generatedId);
                    idCustomPokemons[counter] = generatedId;
                    counter++;
                }                              
            }
            // Compruebo que el usuario no esté ya en la tabla "pokemon_teams"
            query = "SELECT COUNT(*) " +
                        "FROM pokemon_teams INNER JOIN users ON pokemon_teams.idUser = users.idUser " +
                            "WHERE users.username = " + "'" + username + "'";        
            
            PreparedStatement statement = conn.prepareStatement(query);
            ResultSet rs = statement.executeQuery();        
            if (rs.next()) {
                counter = rs.getInt(1);
            }
            if (counter == 0) {
                // Si no está, lo inserto
                System.out.println("No estaba ese usuario, lo inserto");
                query = "INSERT INTO pokemon_teams(idUser, idCustomPokemon1, idCustomPokemon2, idCustomPokemon3, idCustomPokemon4, idCustomPokemon5, idCustomPokemon6) " +
                        "VALUES( " + 
                        "(SELECT idUser FROM users WHERE username = " + "'" + username + "'), " +
                        idCustomPokemons[0] + ", " +
                        idCustomPokemons[1] + ", " +
                        idCustomPokemons[2] + ", " +
                        idCustomPokemons[3] + ", " +
                        idCustomPokemons[4] + ", " +
                        idCustomPokemons[5] + 
                        ");";            
            } else{
                // Si está, lo actualizo
                query = String.format(
                        "UPDATE pokemon_teams " +
                        "SET idCustomPokemon1 = %d, idCustomPokemon2 = %d, idCustomPokemon3 = %d, idCustomPokemon4 = %d, idCustomPokemon5 = %d, idCustomPokemon6 = %d " +
                        "WHERE idUser = (SELECT idUser FROM users WHERE username = '%s');"
                        , idCustomPokemons[0], idCustomPokemons[1], idCustomPokemons[2], idCustomPokemons[3], idCustomPokemons[4], idCustomPokemons[5], username);                        
            }
            System.out.println("=====================================");
            System.out.println("LA CONSULTA ES: ");
            System.out.println(query);
            System.out.println("=====================================");
            statement = conn.prepareStatement(query);
            statement.executeUpdate();
            return "Pokemons successfully inserted into the database.";
        });
    }
    
    
    
    
    
    
     // Registro de usuarios
    private static void attendRegisterUserRequest(Connection conn) {
        Spark.post("/register", (req, res) -> {
            JSONObject responseBody = new JSONObject();
            // Crear objeto JSON a partir del cuerpo de la petición HTTP POST
            Gson gson = new GsonBuilder().create();
            JSONObject requestBody = new JSONObject(req.body());

            String username = requestBody.getString("username");
            String email = requestBody.getString("email");
            String birthdate = requestBody.getString("birthdate");
            String password = requestBody.getString("password");

            // Validar que los datos no estén vacíos
            if (username.isEmpty() || email.isEmpty() || birthdate.isEmpty() ||
                    password.isEmpty()) {
                res.status(400); // Código de respuesta para bad request
                return "Faltan datos";
            }

            // Verificar si el email del usuario ya existe en la base de datos
            String query = String.format("SELECT COUNT(*) FROM users WHERE email = '%s'", email);
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery();
            rs.next();
            int count = rs.getInt(1);
            if (count > 0) {
                res.status(409); // Código de respuesta para conflicto
                responseBody.put("error", "email");
                return responseBody.toString();
            }

            // Verificar si el nombre de usuario ya existe en la base de datos
            query = String.format("SELECT COUNT(*) FROM users WHERE username = '%s'",
                    username);
            stmt = conn.prepareStatement(query);
            rs = stmt.executeQuery();
            rs.next();
            count = rs.getInt(1);
            if (count > 0) {
                res.status(409); // Código de respuesta para conflicto
                responseBody.put("error", "username");
                return responseBody.toString();
            }

            // Insertar usuario en la base de datos
            query = String.format(
                    "INSERT INTO users (email, username, password, birthdayDate) VALUES ('%s', '%s', '%s', '%s')",
                    email, username, password, birthdate);
            stmt = conn.prepareStatement(query);
            stmt.executeUpdate();

            res.status(200);
            return gson.toJson(email);
        });
    }

    // Inicio de sesión de usuarios

    private static void attendLoginUserRequest(Connection conn) {
        Spark.post("/login", (req, res) -> {
            // Crear objeto JSON a partir del cuerpo de la petición HTTP POST
            JSONObject requestBody = new JSONObject(req.body());
            Gson gson = new GsonBuilder().create();

            String email = requestBody.getString("email");
            String password = requestBody.getString("password");

            // Validar que los datos no estén vacíos
            if (email.isEmpty() || password.isEmpty()) {
                res.status(400); // Código de respuesta para bad request
                return "Faltan datos";
            }

            // Verificar las credenciales del usuario en la base de datos
            String query = String.format("SELECT COUNT(*) FROM users WHERE email = '%s' AND password = '%s'",
                    email, password);
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery();
            rs.next();
            int count = rs.getInt(1);
            if (count == 0) {
                res.status(401); // Código de respuesta para autenticación fallida
                return "Credenciales inválidas";
            }

            // Obtener nombre de usuario
            query = String.format("SELECT username FROM users WHERE email = '%s' AND password = '%s'", email, password);
            stmt = conn.prepareStatement(query);
            rs = stmt.executeQuery();
            rs.next();
            String username = rs.getString(1);

            // Autenticación exitosa
            res.status(200);
            String[] response = {email, username};
            return gson.toJson(response);
        });
    }

    public static void main(String[] args) throws Exception {
        ConnMysql conn = new ConnMysql();
        Connection conn2 = connection();
        Server.config();
        Server.redirect();
        Server.attendTutorialRequest();
        Server.attendTypesRequest(conn);
        Server.attendTypeRequest(conn);
        Server.attendGlossaryRequest(conn);
        Server.attendPokemonSearcher(conn);
        Server.attendPokemonItemSearcher(conn);
        Server.attendPokemonMovementSearcher(conn);
        Server.attendPokemonWhoLearnsMovements(conn);
        Server.attendPokemonAbilitySearcher(conn);
        Server.attendPokemonWhoLearnsAbilities(conn);
        Server.getPokemonsName(conn);
        Server.sendEmail();
        Server.getNatures(conn);        
        Server.returnCards(conn);
        Server.attendRegisterUserRequest(conn2);
        Server.attendLoginUserRequest(conn2);
        Server.getIdByEmail(conn);        
        Server.getPokemonCardById(conn2);
        Server.getIdByName(conn2);
        Server.postTeam(conn2);
        
    }

}
