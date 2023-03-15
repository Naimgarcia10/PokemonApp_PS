
const typeSelect = document.getElementById('type-select');
var tipos = [];

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

  // iteramos el array de debilidades
  var listaDebilidades = tipoEncontrado.damage_relations.double_damage_from;
  var stringDebilidades = "";
  for(let i=0;i<listaDebilidades.length;i++){
    stringDebilidades += listaDebilidades[i].name;
    if(i < listaDebilidades.length - 1){
      stringDebilidades += ", ";
    }
  }
  document.querySelector(".valor").innerHTML = stringDebilidades;
});