package backend;
import io.github.cdimascio.dotenv.Dotenv;
import java.sql.*;

public class ConnMysql {

    private Connection conn;

    public ConnMysql() throws Exception{
        Dotenv dotenv = Dotenv.load();
        String DB_CONNECTION = "jdbc:mysql://";
        String DB_HOST = dotenv.get("DB_HOST");
        String DB_PORT = dotenv.get("DB_PORT");
        String DB_NAME = dotenv.get("DB_NAME");

        String url = DB_CONNECTION + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
        String user = dotenv.get("DB_USER");
        String password = dotenv.get("DB_PASSWORD");
        conn = DriverManager.getConnection(url, user, password);
        
    }

    public ResultSet queryMysql(String query) throws Exception{
        Statement stmt = this.conn.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        return rs;
    }

}
