package backend;

public class PokemonMove {

    private String name;
    private String type;
    private String category;

    public PokemonMove(String name, String type, String category) {
        this.name = name;
        this.type = type;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }

    
    
    
}
