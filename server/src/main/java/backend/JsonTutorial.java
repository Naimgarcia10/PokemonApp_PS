package backend;

import java.io.FileReader;
import com.google.gson.*;

public class JsonTutorial {

    public static String get_tutorial(int index) {

        String res = "";

        try {
            //Acceso al JSON
            Gson gson = new Gson();
            FileReader fr = new FileReader("server\\src\\main\\java\\backend\\json\\tutorial.json");
            JsonElement jsonElement = gson.fromJson(fr, JsonElement.class);
            jsonElement = jsonElement.getAsJsonArray().get(index);
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            String ruta_imagen = jsonObject.get("ruta_imagen").getAsString();
            jsonObject.addProperty("ruta_imagen", ruta_imagen);
            res = jsonObject.toString();

        } catch (Exception e) {
            System.out.println(e);
        }
        return res;
    }

}