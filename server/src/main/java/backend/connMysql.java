package backend;

import java.sql.*;

public class connMysql {

    private static Connection conn;

    public connMysql(String url, String user, String password) throws Exception{
        conn = DriverManager.getConnection(url, user, password);
    }

    public ResultSet queryMysql(String query) throws Exception{
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        return rs;
    }

}
