package backend;

import java.util.ArrayList;
import java.util.List;

public class DoubleTypeDamageRelations {
    private List<String> x4;
    private List<String> x2;
    private List<String> x1medio;
    private List<String> x1cuarto;
    private List<String> x0;


    public DoubleTypeDamageRelations() {
        this.x4 = new ArrayList<String>();
        this.x2 = new ArrayList<String>();
        this.x1medio = new ArrayList<String>();
        this.x1cuarto = new ArrayList<String>();
        this.x0 = new ArrayList<String>();
    }
    
    public List<String> getX4() {
        return this.x4;
    }

    public void setX4(List<String> x4) {
        this.x4 = x4;
    }

    public List<String> getX2() {
        return this.x2;
    }

    public void setX2(List<String> x2) {
        this.x2 = x2;
    }

    public List<String> getX1medio() {
        return this.x1medio;
    }

    public void setX1medio(List<String> x1medio) {
        this.x1medio = x1medio;
    }

    public List<String> getX1cuarto() {
        return this.x1cuarto;
    }

    public void setX1cuarto(List<String> x1cuarto) {
        this.x1cuarto = x1cuarto;
    }

    public List<String> getX0() {
        return this.x0;
    }

    public void setX0(List<String> x0) {
        this.x0 = x0;
    }
}