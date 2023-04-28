package backend;

import java.sql.ResultSet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class DamageRelations {

    public String build_damage_SQL(ConnMysql conn) throws Exception {
        // Ejecutar la consulta
        String query = "SELECT t1.name AS type_name, t1.picture AS type_picture, "
                + "GROUP_CONCAT(DISTINCT t2.picture SEPARATOR ', ') AS double_damage_to, "
                + "GROUP_CONCAT(DISTINCT t3.picture SEPARATOR ', ') AS double_damage_from, "
                + "GROUP_CONCAT(DISTINCT t4.picture SEPARATOR ', ') AS half_damage_to, "
                + "GROUP_CONCAT(DISTINCT t5.picture SEPARATOR ', ') AS half_damage_from, "
                + "GROUP_CONCAT(DISTINCT t6.picture SEPARATOR ', ') AS no_damage_to, "
                + "GROUP_CONCAT(DISTINCT t7.picture SEPARATOR ', ') AS no_damage_from "
                + "FROM types t1 "
                + "LEFT JOIN type_effective te1 ON t1.idType = te1.idTypeEffective "
                + "LEFT JOIN types t2 ON t2.idType = te1.idTypeWeak "
                + "LEFT JOIN type_effective te2 ON t1.idType = te2.idTypeWeak "
                + "LEFT JOIN types t3 ON t3.idType = te2.idTypeEffective "
                + "LEFT JOIN type_noteffective tn1 ON t1.idType = tn1.idTypeNotEffective "
                + "LEFT JOIN types t4 ON t4.idType = tn1.idTypeResistant "
                + "LEFT JOIN type_noteffective tn2 ON t1.idType = tn2.idTypeResistant "
                + "LEFT JOIN types t5 ON t5.idType = tn2.idTypeNotEffective "
                + "LEFT JOIN type_zerodamage tz1 ON t1.idType = tz1.idTypeZeroDamage "
                + "LEFT JOIN types t6 ON t6.idType = tz1.idTypeImmune "
                + "LEFT JOIN type_zerodamage tz2 ON t1.idType = tz2.idTypeImmune "
                + "LEFT JOIN types t7 ON t7.idType = tz2.idTypeZeroDamage "
                + "GROUP BY t1.idType";

        ResultSet rs = conn.queryMysql(query);
        // Construir el objeto JSON utilizando Gson
        Gson gson = new GsonBuilder().create();
        JsonArray resultArray = new JsonArray();

        while (rs.next()) {

            JsonObject resultObject = new JsonObject();
            resultObject.addProperty("type_name", rs.getString("type_name"));
            resultObject.addProperty("type_picture", rs.getString("type_picture"));

            String[] doubleDamageTo = rs.getString("double_damage_to") != null
                    ? rs.getString("double_damage_to").split(", ")
                    : null;
            String[] doubleDamageFrom = rs.getString("double_damage_from") != null
                    ? rs.getString("double_damage_from").split(", ")
                    : null;
            String[] halfDamageTo = rs.getString("half_damage_to") != null ? rs.getString("half_damage_to").split(", ")
                    : null;
            String[] halfDamageFrom = rs.getString("half_damage_from") != null
                    ? rs.getString("half_damage_from").split(", ")
                    : null;
            String[] noDamageTo = rs.getString("no_damage_to") != null ? rs.getString("no_damage_to").split(", ")
                    : null;
            String[] noDamageFrom = rs.getString("no_damage_from") != null ? rs.getString("no_damage_from").split(", ")
                    : null;

            resultObject.add("double_damage_to", gson.toJsonTree(doubleDamageTo));
            resultObject.add("double_damage_from", gson.toJsonTree(doubleDamageFrom));
            resultObject.add("half_damage_to", gson.toJsonTree(halfDamageTo));
            resultObject.add("half_damage_from", gson.toJsonTree(halfDamageFrom));
            resultObject.add("no_damage_to", gson.toJsonTree(noDamageTo));
            resultObject.add("no_damage_from", gson.toJsonTree(noDamageFrom));
            resultArray.add(resultObject);
        }

        String json = gson.toJson(resultArray);
        return json;
    }

}
