export class CustomPokemon {


    static id=0;

    constructor(idPokemon, idAbility, idNature, idItem, idMovement1, idMovement2, idMovement3, idMovement4, evsHp, evsAttack, evsDefense, evsSpatk, evsSpdef, evsSpeed,ivsHp, ivsAttack, ivsDefense, ivsSpatk, ivsSpdef, ivsSpeed) {
        
        this.idCustomPokemon = CustomPokemon.id++;
        
        
        this.idPokemon = idPokemon;
        this.idAbility = idAbility;
        this.idNature = idNature;
        this.idItem = idItem;
        this.idMovement1 = idMovement1;
        this.idMovement2 = idMovement2;
        this.idMovement3 = idMovement3;
        this.idMovement4 = idMovement4;
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
    }
}
