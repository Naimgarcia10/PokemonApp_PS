export class CustomPokemon {


    static id=0;

    constructor(name, ability, nature, item, movement1, movement2, movement3, movement4, evsHp, evsAttack, evsDefense, evsSpatk, evsSpdef, evsSpeed, ivsHp, ivsAttack, ivsDefense, ivsSpatk, ivsSpdef, ivsSpeed, image, weaknesses, resistances, immunities, attack, defense, spatk, spdef, speed) {
        
        this.idCustomPokemon = CustomPokemon.id++;
        
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

        /* Para evaluador de equipos */
        this.weaknesses = weaknesses;
        this.resistances = resistances;
        this.immunities = immunities;   
        this.attack = attack;
        this.defense = defense;
        this.spatk = spatk;
        this.spdef = spdef;
        this.speed = speed;
        this.movementType1 = movement     
        
        /* Para pintar */
        this.image = image;
    }


}
