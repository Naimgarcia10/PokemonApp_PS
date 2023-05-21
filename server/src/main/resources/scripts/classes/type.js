export class Type{
    constructor(name, picture, doubleDamageTo, doubleDamageFrom, halfDamageTo, halfDamageFrom, noDamageTo, noDamageFrom){
        this.name = name;
        this.picture = picture;
        this.doubleDamageFrom = (doubleDamageFrom != null) ? doubleDamageFrom : [];
        this.doubleDamageTo = (doubleDamageTo != null) ? doubleDamageTo : [];
        this.halfDamageTo = (halfDamageTo != null) ? halfDamageTo : [];
        this.halfDamageFrom = (halfDamageFrom != null) ? halfDamageFrom : [];
        this.noDamageTo = (noDamageTo != null) ? noDamageTo : [];
        this.noDamageFrom = (noDamageFrom != null) ? noDamageFrom : [];
    }

    /*
    Calculates the effectivity of anotherType against THIS type
    */
    calculateEffectivity(anotherType){        
        if(anotherType instanceof Type){
            // TODO: UTILIZAR IDS EN VEZ DE IMÁGENES
            if(this.doubleDamageFrom.includes(anotherType.picture)){
                return 2;
            }
            else if(this.halfDamageFrom.includes(anotherType.picture)){
                return 0.5;
            }
            else if(this.noDamageFrom.includes(anotherType.picture)){
                return 0;
            }
            else{
                return 1;
            }
        }
    }
}