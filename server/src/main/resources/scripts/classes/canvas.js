import { Button } from "./button.js";
import { AttackButton } from "./attackbutton.js";
import { CanvasImage} from "./canvasimage.js";
export { Canvas }

class Canvas{    

    constructor(canvas){        
        this.canvas = canvas;
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext("2d");
        this.buttons = [];

        this.mouseMoveHandlerBound = this.mouseMoveHandler.bind(this);
        this.mouseClickHandlerBound = this.mouseClickHandler.bind(this);
    }

    dibujarBoton(button) {                
        this.context.fillStyle = button.color;
        //this.context.strokeStyle = colorBorde;
        this.context.fillRect(button.x, button.y, button.width, button.height);
        //this.context.strokeRect(button.x, button.y, button.width, button.height);
                
        this.context.fillStyle = "black";
        this.context.font = button.fuente;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(button.texto, button.x + button.width / 2, button.y + button.height / 3);
        
        if(button instanceof AttackButton){            
            // Dibujamos la imagen del tipo de movimiento abajo a la izquierda del botón
            this.context.drawImage(button.canvasImage.imageObject, button.x + 5, (button.y + button.height) - 20, button.canvasImage.width, button.canvasImage.height);
            this.context.font = "16px Verdana";
            this.context.fillText(button.movement.currentPP + "/" + button.movement.pp, button.x + (button.width / 2) + 50, button.y + button.height - 10);
        }                            
        if(!this.buttons.some(b => b.texto === button.texto)) this.buttons.push(button);        
    }

    dibujarOvalo(x, y, width, height, borderRadius, color) {
        this.context.beginPath();
        this.context.moveTo(x + borderRadius, y);
        this.context.lineTo(x + width - borderRadius, y);
        this.context.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
        this.context.lineTo(x + width, y + height - borderRadius);
        this.context.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
        this.context.lineTo(x + borderRadius, y + height);
        this.context.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
        this.context.lineTo(x, y + borderRadius);
        this.context.arcTo(x, y, x + borderRadius, y, borderRadius);
        this.context.closePath();

        this.context.fillStyle = color;
        this.context.fill();    
    }
      

    async loadImage(canvasImage, overwriteDimensions = false){
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => {
            if(overwriteDimensions){
                canvasImage.width = image.naturalWidth;
                canvasImage.height = image.naturalHeight;
            }            
            canvasImage.imageObject = image;      
            resolve();
          };
          image.onerror = (error) => reject(error);
          image.src = canvasImage.image;
        });
      }

    clearCanvas(){
        this.context.clearRect(0, 0, this.width, this.height);
    }

    resetTransform(){
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    getSelectedButton(mouseX, mouseY){
        return this.buttons.find( button => mouseX >= button.x && mouseX <= button.x + button.width 
                                && mouseY >= button.y && mouseY <= button.y + button.height);
    }

    mouseMoveHandler(event){           
        const rect = this.canvas.getBoundingClientRect();        
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        console.log("mouseX = " + mouseX + " mouseY = " + mouseY)
        
        // Comprobamos si el ratón está dentro de algún botón               
        const selectedButton = this.getSelectedButton(mouseX, mouseY);
        if(selectedButton){
            selectedButton.color = "yellow";
            this.dibujarBoton(selectedButton);
            this.canvas.style.cursor = "pointer";
        } else{
            this.buttons.forEach((button) => {
                if(button.color === "yellow"){
                    button.color = "white";
                    this.dibujarBoton(button);
                    this.canvas.style.cursor = "default";
                }
            });
        }
    }

    mouseClickHandler(event){        
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const selectedButton = this.getSelectedButton(mouseX, mouseY);
        if(selectedButton){            
            const clickSound = new Audio("../../audio/simulator/click.wav");
            clickSound.play();
            const evento = new CustomEvent(
                "buttonClicked",
                {
                    detail: {
                        button: selectedButton
                    },
                }
            )
            this.canvas.dispatchEvent(evento);
        }
    }

    registerMouseEvents(){
        this.canvas.addEventListener("mousemove", this.mouseMoveHandlerBound);
        this.canvas.addEventListener("click", this.mouseClickHandlerBound);        
    }

    unregisterMouseEvents(){
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandlerBound);
        this.canvas.removeEventListener("click", this.mouseClickHandlerBound);
        this.canvas.style.cursor = "default";
    }

    
}

