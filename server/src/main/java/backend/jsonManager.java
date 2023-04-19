package backend;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.util.Base64;
import javax.imageio.ImageIO;
import com.google.gson.*;

public class jsonManager {

    public static String get_tutorial(int index) {
        String line = "";
        String base64 = "data:image/png;base64,";
        try {

            //Acceso al JSON
            Gson gson = new Gson();
            FileReader fr = new FileReader("server\\json\\tutorial.json");
            JsonElement jsonElement = gson.fromJson(fr, JsonElement.class);
            jsonElement = jsonElement.getAsJsonArray().get(index); //Almaceno el elemento concreto del array JSON
            JsonObject jsonObject = jsonElement.getAsJsonObject();

            //Codificación de la imagen
            BufferedImage bufferedImage = ImageIO.read(new File(jsonObject.get("ruta_imagen").getAsString())); //Buffered de imagen (imagen pasada a formato String)
            final ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); //Objeto necesario en la aplicacion de la librería
            ImageIO.write(bufferedImage, "png", outputStream); //Escribo en el outputstream mi bufferedImage
            String encodedImage = base64 + Base64.getEncoder().encodeToString(outputStream.toByteArray());  //pasamos el objeto outputstream a string y lo codificamos

            //Envio de JSON con ruta_image = encodedImage
            jsonObject.addProperty("encodedImage", encodedImage);
            line = jsonObject.toString();

        } catch (Exception e) {
            System.out.println(e);
        }
        return line;
    }

}