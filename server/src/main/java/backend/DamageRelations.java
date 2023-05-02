package backend;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class DamageRelations {

        private String type_name;
        private String type_picture;
        private List<String> doubleDamageTo;
        private List<String> doubleDamageFrom;
        private List<String> halfDamageTo;
        private List<String> halfDamageFrom;
        private List<String> noDamageTo;
        private List<String> noDamageFrom;
                
        public DamageRelations(){
                doubleDamageTo = new ArrayList<String>();
                doubleDamageFrom = new ArrayList<String>();
                halfDamageTo = new ArrayList<String>();
                halfDamageFrom = new ArrayList<String>();
                noDamageTo = new ArrayList<String>();
                noDamageFrom = new ArrayList<String>();
        }

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
                List<DamageRelations> listaDamageRelations = new ArrayList<DamageRelations>();

                while (rs.next()) {

                        DamageRelations damagerelations = new DamageRelations();
                        damagerelations.type_name = rs.getString("type_name");
                        damagerelations.type_picture = rs.getString("type_picture");
                        damagerelations.doubleDamageTo = rs.getString("double_damage_to") != null
                                ? Arrays.asList(rs.getString("double_damage_to").split(", "))
                                : null;
                        damagerelations.doubleDamageFrom = rs.getString("double_damage_from") != null
                                ? Arrays.asList(rs.getString("double_damage_from").split(", "))
                                : null;
                        damagerelations.halfDamageTo = rs.getString("half_damage_to") != null 
                                ? Arrays.asList(rs.getString("half_damage_to").split(", "))
                                : null;
                        damagerelations.halfDamageFrom = rs.getString("half_damage_from") != null
                                ? Arrays.asList(rs.getString("half_damage_from").split(", "))
                                : null;
                        damagerelations.noDamageTo = rs.getString("no_damage_to") != null 
                                ? Arrays.asList(rs.getString("no_damage_to").split(", "))
                                : null;
                        damagerelations.noDamageFrom = rs.getString("no_damage_from") != null 
                                ? Arrays.asList(rs.getString("no_damage_from").split(", "))
                                : null;
                        listaDamageRelations.add(damagerelations);                
                }
                // Construir el objeto JSON utilizando Gson
                Gson gson = new GsonBuilder().serializeNulls().create();
                String json = gson.toJson(listaDamageRelations);
                return json;
        }

        public static DoubleTypeDamageRelations getDoubleWeaknesses(String type1, String type2, ConnMysql conn) throws Exception{
                String query = "SELECT " + 
                                "t1.name AS type_name, " + 
                                "t1.picture AS type_picture, " + 
                                "GROUP_CONCAT(DISTINCT t2.picture SEPARATOR ', ') AS double_damage_to, " + 
                                "GROUP_CONCAT(DISTINCT t3.picture SEPARATOR ', ') AS double_damage_from, " + 
                                "GROUP_CONCAT(DISTINCT t4.picture SEPARATOR ', ') AS half_damage_to, " + 
                                "GROUP_CONCAT(DISTINCT t5.picture SEPARATOR ', ') AS half_damage_from, " + 
                                "GROUP_CONCAT(DISTINCT t6.picture SEPARATOR ', ') AS no_damage_to, " + 
                                "GROUP_CONCAT(DISTINCT t7.picture SEPARATOR ', ') AS no_damage_from " + 
                        "FROM " + 
                                "types t1 " + 
                                "LEFT JOIN type_effective te1 ON t1.idType = te1.idTypeEffective " + 
                                "LEFT JOIN types t2 ON t2.idType = te1.idTypeWeak " + 
                                "LEFT JOIN type_effective te2 ON t1.idType = te2.idTypeWeak " + 
                                "LEFT JOIN types t3 ON t3.idType = te2.idTypeEffective " + 
                                "LEFT JOIN type_noteffective tn1 ON t1.idType = tn1.idTypeNotEffective " + 
                                "LEFT JOIN types t4 ON t4.idType = tn1.idTypeResistant " + 
                                "LEFT JOIN type_noteffective tn2 ON t1.idType = tn2.idTypeResistant " + 
                                "LEFT JOIN types t5 ON t5.idType = tn2.idTypeNotEffective " + 
                                "LEFT JOIN type_zerodamage tz1 ON t1.idType = tz1.idTypeZeroDamage " + 
                                "LEFT JOIN types t6 ON t6.idType = tz1.idTypeImmune " + 
                                "LEFT JOIN type_zerodamage tz2 ON t1.idType = tz2.idTypeImmune " + 
                                "LEFT JOIN types t7 ON t7.idType = tz2.idTypeZeroDamage " + 
                        String.format("WHERE t1.picture IN ('%s', '%s') ", type1, type2) + 
                        "GROUP BY t1.idType;";
                System.out.println(query);
                ResultSet rs = conn.queryMysql(query);                
                List<DamageRelations> listaDamageRelations = new ArrayList<DamageRelations>();
                while (rs.next()) {
                        DamageRelations damagerelations = new DamageRelations();
                        damagerelations.type_name = rs.getString("type_name");
                        damagerelations.type_picture = rs.getString("type_picture");
                        damagerelations.doubleDamageTo = rs.getString("double_damage_to") != null
                                ? Arrays.asList(rs.getString("double_damage_to").split(", "))
                                : new ArrayList<String>();
                        damagerelations.doubleDamageFrom = rs.getString("double_damage_from") != null
                                ? Arrays.asList(rs.getString("double_damage_from").split(", "))
                                : new ArrayList<String>();
                        damagerelations.halfDamageTo = rs.getString("half_damage_to") != null 
                                ? Arrays.asList(rs.getString("half_damage_to").split(", "))
                                : new ArrayList<String>();
                        damagerelations.halfDamageFrom = rs.getString("half_damage_from") != null
                                ? Arrays.asList(rs.getString("half_damage_from").split(", "))
                                : new ArrayList<String>();
                        damagerelations.noDamageTo = rs.getString("no_damage_to") != null 
                                ? Arrays.asList(rs.getString("no_damage_to").split(", "))
                                : new ArrayList<String>();
                        damagerelations.noDamageFrom = rs.getString("no_damage_from") != null 
                                ? Arrays.asList(rs.getString("no_damage_from").split(", "))
                                : new ArrayList<String>();
                        listaDamageRelations.add(damagerelations);               
                }
                
                DamageRelations tipo1 = listaDamageRelations.get(0);
                DamageRelations tipo2 = listaDamageRelations.size() == 2 ? listaDamageRelations.get(1) : new DamageRelations();
                DoubleTypeDamageRelations combinado = new DoubleTypeDamageRelations();   
                ArrayList<String> x4 = interseccion(tipo1.doubleDamageFrom, tipo2.doubleDamageFrom);
                
                ArrayList<String> x2 = union(
                        diferencia(tipo1.doubleDamageFrom, tipo2.halfDamageFrom),
                        diferencia(tipo2.doubleDamageFrom, tipo1.halfDamageFrom)
                );                

                ArrayList<String> x1medio = union(
                        diferencia(tipo1.halfDamageFrom, tipo2.doubleDamageFrom),
                        diferencia(tipo2.halfDamageFrom, tipo1.doubleDamageFrom)
                );                
                ArrayList<String> x1cuarto = interseccion(tipo1.halfDamageFrom, tipo2.halfDamageFrom);                
                ArrayList<String> x0 = union(tipo1.noDamageFrom, tipo2.noDamageFrom);
                

                x2 = diferencia(x2, x4);
                x2 = diferencia(x2, x0);                
                x1medio = diferencia(x1medio, x1cuarto);
                x1medio = diferencia(x1medio, x0);                

                combinado.setX4(x4);
                combinado.setX2(x2);
                combinado.setX1medio(x1medio);
                combinado.setX1cuarto(x1cuarto);
                combinado.setX0(x0);
                return combinado;                
        }

        public static ArrayList<String> union(List<String> lista1, List<String> lista2){
                ArrayList<String> union = new ArrayList<>(lista1);
                union.addAll(lista2);
                union = (ArrayList<String>) union.stream().distinct().collect(Collectors.toList());
                return union;
        }

        public static ArrayList<String> interseccion(List<String> lista1, List<String> lista2){
                ArrayList<String> interseccion = new ArrayList<>(lista1);
                interseccion.retainAll(lista2);
                return interseccion;
        }

        public static ArrayList<String> diferencia(List<String> lista1, List<String> lista2){
                ArrayList<String> lista3 = (ArrayList<String>) lista1.stream()
                        .filter(tipo -> !lista2.contains(tipo))
                        .collect(Collectors.toList());
                return lista3;
        }


        public String getType_name() {
                return this.type_name;
        }

        public void setType_name(String type_name) {
                this.type_name = type_name;
        }

        public String getType_picture() {
                return this.type_picture;
        }

        public void setType_picture(String type_picture) {
                this.type_picture = type_picture;
        }

        public List<String> getDoubleDamageTo() {
                return this.doubleDamageTo;
        }

        public void setDoubleDamageTo(List<String> doubleDamageTo) {
                this.doubleDamageTo = doubleDamageTo;
        }

        public List<String> getDoubleDamageFrom() {
                return this.doubleDamageFrom;
        }

        public void setDoubleDamageFrom(List<String> doubleDamageFrom) {
                this.doubleDamageFrom = doubleDamageFrom;
        }

        public List<String> getHalfDamageTo() {
                return this.halfDamageTo;
        }

        public void setHalfDamageTo(List<String> halfDamageTo) {
                this.halfDamageTo = halfDamageTo;
        }

        public List<String> getHalfDamageFrom() {
                return this.halfDamageFrom;
        }

        public void setHalfDamageFrom(List<String> halfDamageFrom) {
                this.halfDamageFrom = halfDamageFrom;
        }

        public List<String> getNoDamageTo() {
                return this.noDamageTo;
        }

        public void setNoDamageTo(List<String> noDamageTo) {
                this.noDamageTo = noDamageTo;
        }

        public List<String> getNoDamageFrom() {
                return this.noDamageFrom;
        }

        public void setNoDamageFrom(List<String> noDamageFrom) {
                this.noDamageFrom = noDamageFrom;
        }



}
