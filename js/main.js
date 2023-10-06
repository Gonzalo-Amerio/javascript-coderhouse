class Usuario {
  constructor(nombre, edad, genero, peso, altura) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
    this.peso = peso;
    this.altura = altura;
  }
}

function calcularMetabolismoBasal(usuario) {
  if (usuario.genero === "hombre") {
    return 88.362 + 13.397 * usuario.peso + 4.799 * usuario.altura - 5.677 * usuario.edad;
  } else if (usuario.genero === "mujer") {
    return 447.593 + 9.247 * usuario.peso + 3.098 * usuario.altura - 4.330 * usuario.edad;
  } 
}

const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const genero = document.getElementById("genero");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");

function agregarUsuario() {
  const nombreValue = nombre.value
  const edadValue = parseFloat(edad.value);
  const generoValue = genero.value.toLowerCase();
  const pesoValue = parseFloat(peso.value);
  const alturaValue = parseFloat(altura.value);

  const usuario = new Usuario(nombreValue, edadValue, generoValue, pesoValue, alturaValue);

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  const metabolismoBasal = calcularMetabolismoBasal(usuario);

  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = `Tu metabolismo basal es: ${Math.round(metabolismoBasal)} calorías por día.`;


  document.getElementById("nombre").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
}

function mostrarUsuarios() {
  const listaUsuariosElement = document.getElementById("listaUsuarios");
  listaUsuariosElement.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    const listItem = document.createElement("li");
    const metabolismoBasal = calcularMetabolismoBasal(usuario);
    listItem.textContent = `Nombre: ${usuario.nombre}, Edad: ${usuario.edad}, Género: ${usuario.genero}, Peso: ${usuario.peso}, Altura: ${usuario.altura}, Calorías por día: ${Math.round(metabolismoBasal)}`;
    listaUsuariosElement.appendChild(listItem);
  });
}


const usuariosStr = localStorage.getItem("usuarios");
const usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

document.addEventListener("DOMContentLoaded", function () {
  const calcularButton = document.getElementById("calcularButton");
  const mostrarUsuariosButton = document.getElementById("mostrarUsuariosButton");

  calcularButton.addEventListener("click", function () {
    if (nombre.value && edad.value && genero.value && peso.value && altura.value) {
      agregarUsuario();
    }

  });

  mostrarUsuariosButton.addEventListener("click", function () {
    mostrarUsuarios();
  });
});
document.addEventListener('DOMContentLoaded', function () {
  

function obtenerInformacionNutricional(nombreAlimento) {
  const appId = 'b4f92dda';
  const appKey = 'cbed25e132675463f3d6becc7eee22ea';
  const url = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}&beta=true`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`No se pudo realizar la solicitud a la API (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}


document.getElementById('buscarAlimento').addEventListener('click', async function () {
  const nombreAlimento = document.getElementById('nombreAlimento').value;

  try {
    const informacionNutricional = await obtenerInformacionNutricional(nombreAlimento);
    
    const resultadoNutricional = document.getElementById('resultadoNutricional');
    resultadoNutricional.innerHTML = `Información Nutricional para ${nombreAlimento}:<br>
      Calorías: ${Math.round(informacionNutricional.calories)}<br>
      Proteínas: ${Math.round(informacionNutricional.totalNutrients.PROCNT.quantity)}${informacionNutricional.totalNutrients.PROCNT.unit}<br>
      Carbohidratos: ${Math.round(informacionNutricional.totalNutrients.CHOCDF.quantity)}${informacionNutricional.totalNutrients.CHOCDF.unit}<br>
      Grasas: ${Math.round(informacionNutricional.totalNutrients.FAT.quantity)}${informacionNutricional.totalNutrients.FAT.unit}`;
  } catch (error) {
    // Maneja errores, por ejemplo, si no se encuentra información sobre el alimento
    const resultadoNutricional = document.getElementById('resultadoNutricional');
    resultadoNutricional.innerHTML = `No se encontró información nutricional para ${nombreAlimento}.`;
    console.error('Error en la solicitud a la API de Edamam:', error);
  }
});});