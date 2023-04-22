package backend;

import spark.Spark;
import java.sql.*;

public class server {
    public static void main(String[] args) {

        Spark.staticFiles.location("");
        Spark.port(8080);
        Spark.get("/", (req, res) -> {
            res.redirect("/html/home.html");
            return "";
        });

        Spark.get("/tutorial/:index", (rq, rs) -> {
            String param = rq.params(":index");
            int index = Integer.parseInt(param);
            return jsonManager.get_tutorial(index);
        });

        /*Base de datos*/
        /*String url = "jdbc:mysql://localhost:3306/sakila";
        String user = "root";
        String password = "12345";*/

        String url_remote = "jdbc:mysql://beugk46erqljqvqdzm9s-mysql.services.clever-cloud.com:3306/beugk46erqljqvqdzm9s";
        String user_remote = "u2j5iqnwhemyff19";
        String password_remote = "JEiD6HzCOlfVMHBYmH0T";
        

        try{

            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(url_remote, user_remote, password_remote);

            if(conn!=null){
                System.out.println("CONEXION EXITOSA");
            }

        }catch(Exception e){
            System.out.println("-------------------------" + e);
        }
        

    }
}
