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
  const nombreValue = nombre.value;
  const edadValue = parseFloat(edad.value);
  const generoValue = genero.value.toLowerCase();
  const pesoValue = parseFloat(peso.value);
  const alturaValue = parseFloat(altura.value);

  const nombreValido = /^[a-zA-Z]+$/.test(nombreValue);

  if (nombreValido) {
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
  } else {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = "Por favor, ingrese un nombre válido (solo caracteres).";
  }
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

  
  const cargarRutinaButton = document.getElementById("cargarRutinaButton");
  const rutinaInfo = document.getElementById("rutinaInfo");
  let rutinas = [];
  let rutinaActualIndex = -1;

  cargarRutinaButton.addEventListener("click", function () {
    if (rutinas.length === 0 || rutinaActualIndex === rutinas.length - 1) {
      fetch("./rutinas.json")
        .then((response) => response.json())
        .then((data) => {
          rutinas = data.rutinas;
          mostrarRutinaAleatoria();
        })
        .catch((error) => {
          console.error("Error al cargar las rutinas:", error);
        });
    } else {
      mostrarRutinaAleatoria();
    }
  });

  function mostrarRutinaAleatoria() {
    if (rutinas.length > 0) {
      rutinaActualIndex = getRandomInt(0, rutinas.length - 1);
      const rutinaActual = rutinas[rutinaActualIndex];
      mostrarRutina(rutinaActual);
    } else {
      rutinaInfo.textContent = "No hay rutinas disponibles.";
    }
  }

  function mostrarRutina(rutina) {
    rutinaInfo.innerHTML = `
      <h2>Nombre de la rutina: ${rutina.nombre}</h2>
      <p>Descripción: ${rutina.descripcion}</p>
      <p>Días:</p>
      <ul>${rutina.dias.map((dia) => `<li>${dia}</li>`).join("")}</ul>
      <!-- Agrega más información de la rutina según tu formato -->
    `;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});


