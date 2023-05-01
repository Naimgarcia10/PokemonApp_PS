package backend;

public class Abilities {
    
    private int idAbility;
    private String name;
    private String description;
    
    public Abilities(int idAbility, String name, String description){
        this.idAbility = idAbility;
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
    
    public int getAbility(){
        return idAbility;
    }
}
