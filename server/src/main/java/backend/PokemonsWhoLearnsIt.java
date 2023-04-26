package backend;

public class PokemonsWhoLearnsIt {

    private String name;
    private String learn_method;
    private int level;
    private String image;

    public PokemonsWhoLearnsIt(String name, String learn_method, int level, String image) throws Exception{
        this.name = name;
        this.learn_method = learn_method;
        this.level = level;
        this.image = image;
    }


    public String getName() {
        return name;
    }
    public String getLearn_method() {
        return learn_method;
    }
    public int getLevel() {
        return level;
    }
    public String getImage() {
        return image;
    }

    

}
