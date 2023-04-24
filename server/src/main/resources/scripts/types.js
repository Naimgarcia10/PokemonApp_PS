
const typeSelect = document.getElementById('type-select');
var tipos = [];

function agregar_imagenes(container, lista){
  /*
  Recorro la lista que me dan, y por cada imagen que me den, creo un elemento
  */  
  for(let i=0;i<lista.length;i++){
    let picture_element = document.createElement("img");
    picture_element.src = getPictureById(lista[i]);
    container.appendChild(picture_element);
  }  
}

function getPictureById(id){
  for(let i=0;i<tipos.length;i++){
    if(tipos[i].id == id){
      console.log(tipos[i].picture);
      return tipos[i].picture;
    }
  }
  return -1;
}

fetch('../json/pokemon_types.json')
	.then(response => response.json())
	.then(data => {
		tipos = data;
		data.forEach(type => {
			const option = document.createElement('option');
			option.value = type.name;
			option.text = type.name.toUpperCase();
      const img = document.createElement("img");
      img.src = type.picture;
      option.appendChild(img);
			typeSelect.appendChild(option);
		});
	})
	.catch(error => console.log(error));

typeSelect.addEventListener('change', () => {    
  const selectedType = typeSelect.value;         
  const tipoEncontrado = tipos.find(function(tipo){
    return tipo.name === selectedType;
  });      
  let cuadrados_naranjas = document.querySelectorAll(".cuadrado_naranja");
  for(let i=0;i<cuadrados_naranjas.length;i++){    
    let divs = cuadrados_naranjas[i].querySelectorAll("div");    
    for(let j=0;j<divs.length;j++){      
      divs[j].innerHTML = "";
    }
  }
  // ATACANDO
  agregar_imagenes(document.querySelector("#eficazcontra"), tipoEncontrado.damage_relations.double_damage_to);    
  agregar_imagenes(document.querySelector("#pocoeficazcontra"), tipoEncontrado.damage_relations.half_damage_to);
  agregar_imagenes(document.querySelector("#nulocontra"), tipoEncontrado.damage_relations.no_damage_to);

  // DEFENDIENDO
  agregar_imagenes(document.querySelector("#debil_a"), tipoEncontrado.damage_relations.double_damage_from);    
  agregar_imagenes(document.querySelector("#resistente_a"), tipoEncontrado.damage_relations.half_damage_from);
  agregar_imagenes(document.querySelector("#inmune_a"), tipoEncontrado.damage_relations.no_damage_from);
});