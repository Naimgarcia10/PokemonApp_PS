
const typeSelect = document.getElementById('type-select');
var tipos = [];

function lista_a_string(lista){
  var stringDebilidades = "";
  for(let i=0;i<lista.length;i++){
    stringDebilidades += lista[i].name;
    if(i < lista.length - 1){
      stringDebilidades += ", ";
    }
  }
  return stringDebilidades;
}

fetch('../json/type.json')
	.then(response => response.json())
	.then(data => {
		tipos = data;
		data.forEach(type => {
			const option = document.createElement('option');
			option.value = type.name;
			option.text = type.name;
			typeSelect.appendChild(option);
		});
	})
	.catch(error => console.log(error));

typeSelect.addEventListener('change', () => {  
  const selectedType = typeSelect.value;         
  const tipoEncontrado = tipos.find(function(tipo){
    return tipo.name === selectedType;
  });  
  console.log(tipoEncontrado);

  // ATACANDO
  document.querySelector(".eficazcontra").innerHTML = lista_a_string(tipoEncontrado.damage_relations.double_damage_to);
  document.querySelector(".pocoeficazcontra").innerHTML = lista_a_string(tipoEncontrado.damage_relations.half_damage_to);
  document.querySelector(".nulocontra").innerHTML = lista_a_string(tipoEncontrado.damage_relations.no_damage_to);

  // DEFENDIENDO
  document.querySelector(".debil_a").innerHTML = lista_a_string(tipoEncontrado.damage_relations.double_damage_from);
  document.querySelector(".resistente_a").innerHTML = lista_a_string(tipoEncontrado.damage_relations.half_damage_from);
  document.querySelector(".inmune_a").innerHTML = lista_a_string(tipoEncontrado.damage_relations.no_damage_from);
});