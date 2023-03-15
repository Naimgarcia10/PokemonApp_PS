
const typeSelect = document.getElementById('type-select');

fetch('type.json')
	.then(response => response.json())
	.then(data => {
		
		data.forEach(type => {
			const option = document.createElement('option');
			option.value = type.name;
			option.text = type.name;
			typeSelect.appendChild(option);
		});
	})
	.catch(error => console.log(error));

    function findWeaknesses(selectedType) {
        fetch('type.json')
          .then(response => response.json())
          .then(data => {
            const weaknesses = data.find(type => type.name === selectedType).damage_relations.double_damage_from;
            console.log(`Los siguientes tipos son débiles a ${selectedType}:`);
            weaknesses.forEach(type => console.log(type.name));
          })
          .catch(error => console.log(error));
      }
      

      typeSelect.addEventListener('change', () => {
        const selectedType = typeSelect.value;   
        const elementoEncontrado = data.find(function(elemento){
            return elemento.name === "normal";
        })                     
        document.querySelector(".valor").innerHTML = elementoEncontrado.name;
      });
      