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
});

const rutinasJSON = {
  rutinas: [
    {
      nombre: "Rutina Weider",
      descripcion: "Una rutina de entrenamiento clásica que se centra en grupos musculares específicos en días separados.",
      dias: ["Lunes - Pecho", "Martes - Espalda", "Miércoles - Piernas", "Jueves - Hombros", "Viernes - Brazos"],
    },
    {
      nombre: "Rutina Push Pull Legs",
      descripcion: "Una rutina que divide los ejercicios en empuje, tracción y piernas.",
      dias: ["Lunes - Empuje", "Miércoles - Tracción", "Viernes - Piernas"],
    },
    {
      nombre: "Rutina Arnold",
      descripcion: "Una rutina de entrenamiento diseñada por Arnold Schwarzenegger.",
      dias: ["Lunes - Pecho y Espalda", "Martes - Piernas y Hombros", "Miércoles - Descanso", "Jueves - Brazos y Espalda", "Viernes - Piernas y Hombros", "Sábado - Pecho y Brazos", "Domingo - Descanso"],
    },
  ],
};

let rutinaActualIndex = 0; 

function mostrarRutina(index) {
  const rutinaContainer = document.getElementById("rutinaContainer");
  const rutinaActual = rutinasJSON.rutinas[index];

  if (rutinaActual) {
    const rutinaHTML = `
      <h3 class="font-semibold text-lg mt-2">${rutinaActual.nombre}</h3>
      <p>${rutinaActual.descripcion}</p>
      <ul>
        ${rutinaActual.dias.map((dia) => `<li>${dia}</li>`).join("")}
      </ul>
    `;

    rutinaContainer.innerHTML = rutinaHTML;
  } else {
    rutinaContainer.innerHTML = "No hay más rutinas.";
  }
}


mostrarRutina(rutinaActualIndex);

document.getElementById("mostrarRutinaAnterior").addEventListener("click", () => {
  rutinaActualIndex--;
  if (rutinaActualIndex < 0) {
    rutinaActualIndex = rutinasJSON.rutinas.length - 1;
  }
  mostrarRutina(rutinaActualIndex);
});

document.getElementById("mostrarSiguienteRutina").addEventListener("click", () => {
  rutinaActualIndex++;
  if (rutinaActualIndex >= rutinasJSON.rutinas.length) {
    rutinaActualIndex = 0;
  }
  mostrarRutina(rutinaActualIndex);
});
