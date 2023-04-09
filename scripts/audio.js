document.addEventListener("DOMContentLoaded",()=>{

    let imagen_audio = document.getElementById("imagen_boton_audio");
    imagen_audio.src = "../icons/pikachu_play.png";

    imagen_audio.addEventListener("click",()=>{
        let audio = document.getElementById("audio");
        audio.volume = 0.03;
        //audio.loop;
        if(audio.paused){
            audio.play();
            imagen_audio.src = "../icons/pikachu_pause.png";
        }else{
            audio.pause();
            imagen_audio.src = "../icons/pikachu_play.png";
        }
    
    });
});



