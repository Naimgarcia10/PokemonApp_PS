export class Button {
    static id = 0;
    constructor(x, y, width, height, color, texto, fuente="20px Verdana"){
        this.id = Button.id++;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;  
        this.color = color;
        this.texto = texto;
        this.fuente = fuente;
    }
}