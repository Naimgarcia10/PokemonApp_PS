import { Button } from "./button.js";
import { CanvasImage} from "./canvasimage.js";
export class AttackButton extends Button{
    constructor(x, y, width, height, color, fuente="20px Verdana", movement, canvasImage){
        super(x, y, width, height, color, movement.name, fuente);        
        this.movement = movement;
        this.canvasImage = canvasImage;
    }
}