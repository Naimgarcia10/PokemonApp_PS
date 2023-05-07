import {DB_HOST, DB_PORT} from "./config.js"

const typeSelect = document.getElementById('type-select');
var tipos = [];

function agregar_imagenes(container, lista){
  /*
  Recorro la lista que me dan, y por cada imagen que me den, creo un elemento
  */  
  for(let i=0;i<lista?.length;i++){
    let picture_element = document.createElement("img");
    picture_element.src = ".." + lista[i];
    container.appendChild(picture_element);
  }  
}

fetch(`http://${DB_HOST}:${DB_PORT}/getTypes`)
	.then(response => response.json())
	.then(data => {
		tipos = data;
		data.forEach(type => {
			const option = document.createElement('option');
			option.value = type.type_name;
			option.text = type.type_name.toUpperCase();
      const img = document.createElement("img");
      img.src = type.type_picture;
      option.appendChild(img);
			typeSelect.appendChild(option);
		});
	})
	.catch(error => console.log(error));

typeSelect.addEventListener('change', () => {    
  const selectedType = typeSelect.value;         
  const tipoEncontrado = tipos.find(function(tipo){
    return tipo.type_name === selectedType;
  });      
  let cuadrados_naranjas = document.querySelectorAll(".cuadrado_naranja");
  for(let i=0;i<cuadrados_naranjas.length;i++){    
    let divs = cuadrados_naranjas[i].querySelectorAll("div");    
    for(let j=0;j<divs.length;j++){      
      divs[j].innerHTML = "";
    }
  }
  // ATACANDO
  agregar_imagenes(document.querySelector("#eficazcontra"), tipoEncontrado.doubleDamageTo);    
  agregar_imagenes(document.querySelector("#pocoeficazcontra"), tipoEncontrado.halfDamageTo);
  agregar_imagenes(document.querySelector("#nulocontra"), tipoEncontrado.noDamageTo);

  // DEFENDIENDO
  agregar_imagenes(document.querySelector("#debil_a"), tipoEncontrado.doubleDamageFrom);    
  agregar_imagenes(document.querySelector("#resistente_a"), tipoEncontrado.halfDamageFrom);
  agregar_imagenes(document.querySelector("#inmune_a"), tipoEncontrado.noDamageFrom);
});