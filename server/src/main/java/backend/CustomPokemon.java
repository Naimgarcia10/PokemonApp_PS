package backend;

public class CustomPokemon{
    private String name;
    private String ability;
    private String nature;
    private String item;
    private String movement1;
    private String movement2;
    private String movement3;
    private String movement4;
    private int evsHp;
    private int evsAttack;
    private int evsDefense;
    private int evsSpatk;
    private int evsSpdef;
    private int evsSpeed;
    private int ivsHp;
    private int ivsAttack;
    private int ivsDefense;
    private int ivsSpatk;
    private int ivsSpdef;
    private int ivsSpeed;

    private String image;

    public CustomPokemon(String name, String ability, String nature, String item, String movement1, String movement2, String movement3, String movement4, int evsHp,
    int evsAttack, int evsDefense, int evsSpatk, int evsSpdef, int evsSpeed, int ivsHp, int ivsAttack, int ivsDefense, int ivsSpatk, int ivsSpdef, int ivsSpeed, String image){
        this.name = name;
        this.ability = ability;
        this.nature = nature;
        this.item = item;
        this.movement1 = movement1;
        this.movement2 = movement2;
        this.movement3 = movement3;
        this.movement4 = movement4;
        this.evsHp = evsHp;
        this.evsAttack = evsAttack;
        this.evsDefense = evsDefense;
        this.evsSpatk = evsSpatk;
        this.evsSpdef = evsSpdef;
        this.evsSpeed = evsSpeed;
        this.ivsHp = ivsHp;
        this.ivsAttack = ivsAttack;
        this.ivsDefense = ivsDefense;
        this.ivsSpatk = ivsSpatk;
        this.ivsSpdef = ivsSpdef;
        this.ivsSpeed = ivsSpeed;

        this.image = image;
    }

    public String getName(){
        return name;
    }

    public String getAbility(){
        return ability;
    }

    public String getNature(){
        return nature;
    }

    public String getItem(){
        return item;
    }

    public String getMovement1(){
        return movement1;
    }

    public String getMovement2(){
        return movement2;
    }

    public String getMovement3(){
        return movement3;
    }

    public String getMovement4(){
        return movement4;
    }

    public int getEvsHp(){
        return evsHp;
    }

    public int getEvsAttack(){
        return evsAttack;
    }

    public int getEvsDefense(){
        return evsDefense;
    }

    public int getEvsSpatk(){
        return evsSpatk;
    }

    public int getEvsSpdef(){
        return evsSpdef;
    }

    public int getEvsSpeed(){
        return evsSpeed;
    }

    public int getIvsHp(){
        return ivsHp;
    }

    public int getIvsAttack(){
        return ivsAttack;
    }

    public int getIvsDefense(){
        return ivsDefense;
    }

    public int getIvsSpatk(){
        return ivsSpatk;
    }

    public int getIvsSpdef(){
        return ivsSpdef;
    }

    public int getIvsSpeed(){
        return ivsSpeed;
    }

    public String getImage(){
        return image;
    }
}