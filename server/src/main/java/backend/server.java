package backend;

import spark.Spark;
import java.sql.*;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class server {
    public static void main(String[] args) {

        String url = "jdbc:mysql://83.57.167.76:3306/pokemondb";
        String user = "root";
        String password = "PokemonAPP_PS";
        connMysql conn;

        try {
            conn = new connMysql(url, user, password);
        } catch (Exception e) {
            System.out.println(e);
            return;
        }

        /**/
        Spark.staticFiles.location("");
        Spark.port(8080);
        Spark.get("/", (req, res) -> {
            res.redirect("/html/home.html");
            return "";
        });

        /**/
        Spark.get("/tutorial/:index", (rq, rs) -> {
            String param = rq.params(":index");
            int index = Integer.parseInt(param);
            return jsonManager.get_tutorial(index);
        });

        /**/
        Spark.get("/getItems", (req, res) -> {

            String query = "SELECT name, description FROM objects";
            ResultSet rs = conn.queryMysql(query);

            Gson gson = new GsonBuilder().create();
            ArrayList<item> array = new ArrayList<>();
            while (rs.next()) {
                item item = new item(rs.getString("name"), rs.getString("description"));
                array.add(item);
            }
            return gson.toJson(array);
            
        });

    }

}
