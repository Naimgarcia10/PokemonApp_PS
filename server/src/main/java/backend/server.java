package backend;

//import org.eclipse.jetty.http.MetaData.Response;

import spark.Spark;

public class server {
    public static void main(String[] args) {
        
        Spark.staticFiles.location("");
        Spark.port(8080);
        Spark.get("/", (req, res) -> {
            res.redirect("/html/home.html");
            return "";
        });
    }
}
