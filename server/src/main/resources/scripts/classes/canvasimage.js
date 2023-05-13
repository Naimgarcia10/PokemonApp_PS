export class CanvasImage{
    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;  
        this.image = image; // esta es la ruta de la imagen
        this.imageObject = null; // aquí se guarda el objeto Image() de JavaScript

        this.originalX = x;
        this.originalY = y;
    }
}