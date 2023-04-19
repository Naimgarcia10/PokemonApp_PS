package backend;

import spark.Spark;

public class server 
{
    public static void main( String[] args )
    {   
        
        Spark.port(8080);
        Spark.get("/tutorial/:index", (rq,rs)->{
            String param = rq.params(":index");
            int index = Integer.parseInt(param);
            return jsonManager.get_tutorial(index);
        });

    }
}
