package backend;

public class PokemonMove {

    private String name;
    private String description;
    private Type type;
    private String category;
    private int power;
    private int accuracy;
    private int pp;
    private int priority; 

    public PokemonMove(String name, String description, Type type, String category, int power, int accuracy, int pp, int priority) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.category = category;
        this.power = power;
        this.accuracy = accuracy;
        this.pp = pp;
        this.priority = priority;
    }

    public String getName() {
        return name;
    }

    public Type getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }

    public int getPower() {
        return power;
    }

    public int getAccuracy() {
        return accuracy;
    }

    public int getPp() {
        return pp;
    }

    public int getPriority() {
        return priority;
    }

    public String getDescription() {
        return description;
    }        
    
}
