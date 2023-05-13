import { Nature } from "./nature.js";

export class Pokemon{
    constructor(name, type1, type2, hpBase, attackBase, defenseBase, spatkBase, spdefBase, speedBase, image, movements){    

        this.level = 100; // por el momento el nivel siempre será 100
        let evsHp = 0;
        let evsAttack = 0;
        let evsDefense = 0;
        let evsSpAtk = 0;
        let evsSpDef = 0;
        let evsSpeed = 0;        
        let ivsHp = 31;
        let ivsAttack = 31;
        let ivsDefense = 31;
        let ivsSpAtk = 31;
        let ivsSpDef = 31;
        let ivsSpeed = 31;
        let nature = new Nature("hardy", 1, 1, 1, 1, 1); // por el momento la naturaleza siempre será hardy

        this.name = name;
        this.type1 = type1;
        this.type2 = type2;        
        this.image = image;
        this.movements = movements;                
        this.hp = this.calculateHp(hpBase, ivsHp, evsHp, nature);
        this.attack = this.calculateAttack(attackBase, ivsAttack, evsAttack, nature);
        this.defense = this.calculateDefense(defenseBase, ivsDefense, evsDefense, nature);
        this.spatk = this.calculateSpAtk(spatkBase, ivsSpAtk, evsSpAtk, nature);
        this.spdef = this.calculateSpDef(spdefBase, ivsSpDef, evsSpDef, nature);
        this.speed = this.calculateSpeed(speedBase, ivsSpeed, evsSpeed, nature);

        this.currentHP = this.hp; // la vida actual. Se irá modificando a medida que el pokemon reciba daño
    }

    attackPokemon(pokemon2, movement){
        if(pokemon2 instanceof Pokemon){
            movement.currentPP--;
            let damage = 0;
            const level = 100;            
            let typeEffectivity = pokemon2.type1.calculateEffectivity(movement.type);
            let movementHit = this.calculateProbability(movement.accuracy);
            if(!movementHit) return {damage: 0, typeEffectivity: -1}
            if(pokemon2.type2 != null) typeEffectivity *= pokemon2.type2.calculateEffectivity(movement.type);
            if(movement.category == "/images/movements/physical.png"){
                damage = Math.floor((((((2 * level) / 5) + 2) * movement.power * (this.attack / pokemon2.defense)) / 50) + 2) * typeEffectivity;
            }
            else if(movement.category == "/images/movements/special.png"){
                damage = Math.floor((((((2 * level) / 5) + 2) * movement.power * (this.spatk / pokemon2.spdef)) / 50) + 2) * typeEffectivity;
            }
            else if(movement.category == "/images/movements/status.png"){
                alert("Error en el código, no debería haber movimientos de estado en esta versión.");
                return;
            }            
            console.log(movement);
            pokemon2.currentHP -= damage;
            if(pokemon2.currentHP < 0) pokemon2.currentHP = 0;
            return {
                damage: damage,
                typeEffectivity: typeEffectivity
            };
        }
    }

    calculateProbability(accuracy){                
        // Generar un número aleatorio entre 0 y 1
        const randomValue = Math.random();        
        // Convertir la precisión a un rango entre 0 y 1
        const precisionRange = accuracy / 100;
        // Comprobar si el movimiento acertó
        console.log("randomValue: " + randomValue + " precisionRange: " + precisionRange);
        return (randomValue <= precisionRange)
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }

    calculateHp(hpBase, ivsHp, evsHp){
        return Math.floor((((2 * hpBase + ivsHp + (evsHp / 4)) * this.level) / 100) + this.level + 10);
    }

    calculateAttack(attackBase, ivsAttack, evsAttack, nature){
        return Math.floor(((((2 * attackBase + ivsAttack + (evsAttack / 4)) * this.level) / 100) + 5) * nature.attack);
    }

    calculateDefense(defenseBase, ivsDefense, evsDefense, nature){
        return Math.floor(((((2 * defenseBase + ivsDefense + (evsDefense / 4)) * this.level) / 100) + 5) * nature.defense);
    }

    calculateSpAtk(spatkBase, ivsSpAtk, evsSpAtk, nature){
        return Math.floor(((((2 * spatkBase + ivsSpAtk + (evsSpAtk / 4)) * this.level) / 100) + 5) * nature.spatk);
    }

    calculateSpDef(spdefBase, ivsSpDef, evsSpDef, nature){
        return Math.floor(((((2 * spdefBase + ivsSpDef + (evsSpDef / 4)) * this.level) / 100) + 5) * nature.spdef);
    }

    calculateSpeed(speedBase, ivsSpeed, evsSpeed, nature){
        return Math.floor(((((2 * speedBase + ivsSpeed + (evsSpeed / 4)) * this.level) / 100) + 5) * nature.speed);
    }
}