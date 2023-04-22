package backend;

import spark.Spark;
import java.sql.*;
import java.util.ArrayList;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.protobuf.Type;

public class Server {
    public static void main(String[] args) {

        String url = "jdbc:mysql://83.57.167.76:3306/pokemondb";
        String user = "root";
        String password = "PokemonAPP_PS";
        ConnMysql conn;

        try {
            conn = new ConnMysql(url, user, password);
        } catch (Exception e) {
            System.out.println(e);
            return;
        }

        Spark.staticFiles.location("");
        Spark.port(8080);

        /**/
        Spark.get("/", (req, res) -> {
            res.redirect("/html/home.html");
            return "";
        });

        /**/
        Spark.get("/tutorial/:index", (rq, rs) -> {
            String param = rq.params(":index");
            int index = Integer.parseInt(param);
            return JsonManager.get_tutorial(index);
        });

        /**/
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

            String query = "SELECT name, picture FROM types";
            ResultSet rs = conn.queryMysql(query);
            Gson gson = new GsonBuilder().create();
            ArrayList<Types> array = new ArrayList<>();

            rs.next();
            Types item = new Types(rs.getString("name"), rs.getString("picture"));
            array.add(item);
            return gson.toJson(array);

        });

    }

}
