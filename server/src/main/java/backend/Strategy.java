package backend;

public class Strategy {
    private String name;
    private String description;
    private String ability;
    
    private String move1name;
    private String move1type;
    private int move1pp;
    
    private String move2name;
    private String move2type;
    private int move2pp;
    
    private String move3name;
    private String move3type;
    private int move3pp;

    private String move4name;
    private String move4type;
    private int move4pp;

    private String itemName;
    private String itemPicture;
    private String nature;

    private int evsHp;
    private int evsAttack;
    private int evsDefense;
    private int evsSpatk;
    private int evsSpdef;
    private int evsSpeed;

    public Strategy(){

    }

    public Strategy(String name, String description, String ability, String move1name, String move1type, int move1pp, String move2name, String move2type, int move2pp, String move3name, String move3type, int move3pp, String move4name, String move4type, int move4pp, String itemName, String itemPicture, String nature, int evsHp, int evsAttack, int evsDefense, int evsSpatk, int evsSpdef, int evsSpeed) {
        this.name = name;
        this.description = description;
        this.ability = ability;
        this.move1name = move1name;
        this.move1type = move1type;
        this.move1pp = move1pp;
        this.move2name = move2name;
        this.move2type = move2type;
        this.move2pp = move2pp;
        this.move3name = move3name;
        this.move3type = move3type;
        this.move3pp = move3pp;
        this.move4name = move4name;
        this.move4type = move4type;
        this.move4pp = move4pp;
        this.itemName = itemName;
        this.itemPicture = itemPicture;
        this.nature = nature;
        this.evsHp = evsHp;
        this.evsAttack = evsAttack;
        this.evsDefense = evsDefense;
        this.evsSpatk = evsSpatk;
        this.evsSpdef = evsSpdef;
        this.evsSpeed = evsSpeed;
    }


    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAbility() {
        return this.ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String getMove1name() {
        return this.move1name;
    }

    public void setMove1name(String move1name) {
        this.move1name = move1name;
    }

    public String getMove1type() {
        return this.move1type;
    }

    public void setMove1type(String move1type) {
        this.move1type = move1type;
    }

    public int getMove1pp() {
        return this.move1pp;
    }

    public void setMove1pp(int move1pp) {
        this.move1pp = move1pp;
    }

    public String getMove2name() {
        return this.move2name;
    }

    public void setMove2name(String move2name) {
        this.move2name = move2name;
    }

    public String getMove2type() {
        return this.move2type;
    }

    public void setMove2type(String move2type) {
        this.move2type = move2type;
    }

    public int getMove2pp() {
        return this.move2pp;
    }

    public void setMove2pp(int move2pp) {
        this.move2pp = move2pp;
    }

    public String getMove3name() {
        return this.move3name;
    }

    public void setMove3name(String move3name) {
        this.move3name = move3name;
    }

    public String getMove3type() {
        return this.move3type;
    }

    public void setMove3type(String move3type) {
        this.move3type = move3type;
    }

    public int getMove3pp() {
        return this.move3pp;
    }

    public void setMove3pp(int move3pp) {
        this.move3pp = move3pp;
    }

    public String getMove4name() {
        return this.move4name;
    }

    public void setMove4name(String move4name) {
        this.move4name = move4name;
    }

    public String getMove4type() {
        return this.move4type;
    }

    public void setMove4type(String move4type) {
        this.move4type = move4type;
    }

    public int getMove4pp() {
        return this.move4pp;
    }

    public void setMove4pp(int move4pp) {
        this.move4pp = move4pp;
    }

    public String getItemName() {
        return this.itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemPicture() {
        return this.itemPicture;
    }

    public void setItemPicture(String itemPicture) {
        this.itemPicture = itemPicture;
    }

    public String getNature() {
        return this.nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public int getEvsHp() {
        return this.evsHp;
    }

    public void setEvsHp(int evsHp) {
        this.evsHp = evsHp;
    }

    public int getEvsAttack() {
        return this.evsAttack;
    }

    public void setEvsAttack(int evsAttack) {
        this.evsAttack = evsAttack;
    }

    public int getEvsDefense() {
        return this.evsDefense;
    }

    public void setEvsDefense(int evsDefense) {
        this.evsDefense = evsDefense;
    }

    public int getEvsSpatk() {
        return this.evsSpatk;
    }

    public void setEvsSpatk(int evsSpatk) {
        this.evsSpatk = evsSpatk;
    }

    public int getEvsSpdef() {
        return this.evsSpdef;
    }

    public void setEvsSpdef(int evsSpdef) {
        this.evsSpdef = evsSpdef;
    }

    public int getEvsSpeed() {
        return this.evsSpeed;
    }

    public void setEvsSpeed(int evsSpeed) {
        this.evsSpeed = evsSpeed;
    }



}