package backend;

import java.sql.*;

public class ConnMysql {

    private static Connection conn;

    public ConnMysql(String url, String user, String password) throws Exception{
        conn = DriverManager.getConnection(url, user, password);
    }

    public ResultSet queryMysql(String query) throws Exception{
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        return rs;
    }

}
