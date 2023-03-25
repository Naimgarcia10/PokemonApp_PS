package backend;

import java.io.FileReader;
import com.google.gson.*;

public class jsonManager {

    public static String get_tutorial(int index){
        String line = "";
        try {
            Gson gson = new Gson();
            FileReader fr = new FileReader("server\\json\\tutorial.json");
            JsonElement jsonElement = gson.fromJson(fr, JsonElement.class);
            JsonArray jsonArray = jsonElement.getAsJsonArray();
            line = jsonArray.get(index).toString();
            
        } catch (Exception e) {
            System.out.println(e);
        }
        return line;
    }

}
