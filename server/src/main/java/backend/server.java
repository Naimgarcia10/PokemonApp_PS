package backend;

import spark.Spark;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.*;
import java.util.ArrayList;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Server {

    private static String accessData[] = new String[3];

    private static void initializeData() throws Exception{

        FileReader fr = new FileReader("server\\src\\main\\java\\backend\\access\\access.txt");
        BufferedReader br = new BufferedReader(fr);
        String line = "";

        for(int i = 0;(line = br.readLine()) != null;i++){
            accessData[i] = line;
        }

        br.close();
    }

    public static void main(String[] args) {

        ConnMysql conn;

        try {
            Server.initializeData();
            conn = new ConnMysql(accessData[0], accessData[1], accessData[2]);
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
            return JsonTutorial.get_tutorial(index);
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
