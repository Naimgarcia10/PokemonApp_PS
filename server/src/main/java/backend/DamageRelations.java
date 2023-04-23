package backend;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class DamageRelations {

    private List<Integer> double_damage_from;
    private List<Integer> double_damage_to;
    private List<Integer> half_damage_from;
    private List<Integer> half_damage_to;
    private List<Integer> no_damage_from;
    private List<Integer> no_damage_to;

    public DamageRelations(int id, ConnMysql conn) throws Exception {
        this.initialize(id, conn);
    }

    private void initialize(int id, ConnMysql conn) throws Exception {
        this.get_double_damage_from_SQL(id, conn);
        this.get_double_damage_to_SQL(id, conn);
        this.get_half_damage_from_SQL(id, conn);
        this.get_half_damage_to_SQL(id, conn);
        this.get_no_damage_from_SQL(id, conn);
        this.get_no_damage_to_SQL(id, conn);
    }

    private void get_double_damage_from_SQL(int id, ConnMysql conn) throws Exception {

        this.double_damage_from = new ArrayList<Integer>();
        String columnLabel = "idTypeEffective";
        String query = "SELECT " + columnLabel + " " +
                "FROM types " +
                "JOIN type_effective ON types.idType = type_effective.idTypeWeak " +
                "WHERE types.idType = " + id;
        ResultSet rs = conn.queryMysql(query);
        this.addRequestResult(rs, this.double_damage_from, columnLabel);

    }

    private void get_double_damage_to_SQL(int id, ConnMysql conn) throws Exception {
        this.double_damage_to = new ArrayList<Integer>();
        String columnLabel = "idTypeWeak";
        String query = "SELECT " + columnLabel + " " +
                "FROM types " +
                "JOIN type_effective ON types.idType = type_effective.idTypeEffective " +
                "WHERE types.idType = " + id;
        ResultSet rs = conn.queryMysql(query);
        this.addRequestResult(rs, this.double_damage_to, columnLabel);
    }

    private void get_half_damage_from_SQL(int id, ConnMysql conn) throws Exception {
        this.half_damage_from = new ArrayList<Integer>();
        String columnLabel = "idTypeNotEffective";
        String query = "SELECT " + columnLabel + " " +
                "FROM types " +
                "JOIN type_noteffective ON types.idType = type_noteffective.idTypeResistant " +
                "WHERE types.idType = " + id;
        ResultSet rs = conn.queryMysql(query);
        this.addRequestResult(rs, this.half_damage_from, columnLabel);
    }

    private void get_half_damage_to_SQL(int id, ConnMysql conn) throws Exception {
        this.half_damage_to = new ArrayList<Integer>();
        String columnLabel = "idTypeResistant";
        String query = "SELECT " + columnLabel + " " +
                "FROM types " +
                "JOIN type_noteffective ON types.idType = type_noteffective.idTypeNotEffective " +
                "WHERE types.idType = " + id;
        ResultSet rs = conn.queryMysql(query);
        this.addRequestResult(rs, this.half_damage_to, columnLabel);
    }

    private void get_no_damage_from_SQL(int id, ConnMysql conn) throws Exception {
        this.no_damage_from = new ArrayList<Integer>();
        String columnLabel = "idTypeZeroDamage";
        String query = "SELECT " + columnLabel + " " +
                "FROM types " +
                "JOIN type_zerodamage ON types.idType = type_zerodamage.idTypeImmune " +
                "WHERE types.idType = " + id;
        ResultSet rs = conn.queryMysql(query);
        this.addRequestResult(rs, this.no_damage_from, columnLabel);
    }

    private void get_no_damage_to_SQL(int id, ConnMysql conn) throws Exception {
        this.no_damage_to = new ArrayList<Integer>();
        String columnLabel = "idTypeImmune";
        String query = "SELECT " + columnLabel + " " +
                "FROM types " +
                "JOIN type_zerodamage ON types.idType = type_zerodamage.idTypeZeroDamage " +
                "WHERE types.idType = " + id;
        ResultSet rs = conn.queryMysql(query);
        this.addRequestResult(rs, this.no_damage_to, columnLabel);
    }


    /*Metodo privado para inserción de resultados*/
    private void addRequestResult(ResultSet rs, List<Integer> array, String columnLabel) throws Exception {

        while (rs.next()) {
            array.add(rs.getInt(columnLabel));
        }

    }

    /* Getters */

    public List<Integer> getDouble_damage_from() {
        return double_damage_from;
    }

    public List<Integer> getDouble_damage_to() {
        return double_damage_to;
    }

    public List<Integer> getHalf_damage_from() {
        return half_damage_from;
    }

    public List<Integer> getHalf_damage_to() {
        return half_damage_to;
    }

    public List<Integer> getNo_damage_from() {
        return no_damage_from;
    }

    public List<Integer> getNo_damage_to() {
        return no_damage_to;
    }

}
