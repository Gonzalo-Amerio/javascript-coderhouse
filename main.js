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
  
  function agregarUsuario() {
    let nombre;
    do {
      nombre = prompt("Ingresa tu nombre:");
      if (!nombre.match(/^[a-zA-Z]+$/)) {
        alert("Nombre no valido. Ingresa una cadena de texto.");
      }
    } while (!nombre.match(/^[a-zA-Z]+$/));
  
    const edad = validarNumero("edad");
    const peso = validarNumero("peso");
    const altura = validarNumero("altura");
    const genero = validacionGenero();
  
    const usuario = new Usuario(nombre, edad, genero, peso, altura);
    usuarios.push(usuario);
  
    const metabolismoBasal = calcularMetabolismoBasal(usuario);
  
    alert("Tu metabolismo basal es: " + Math.round(metabolismoBasal) + " calorías por día.");
  }
  
  function validacionGenero() {
    let genero;
    do {
      genero = prompt("Ingresa tu género (hombre/mujer):").toLowerCase();
      if (genero !== "hombre" && genero !== "mujer") {
        alert("No ingresaste un género válido (hombre/mujer).");
      }
    } while (genero !== "hombre" && genero !== "mujer");
    return genero;
  }
  
  function validarNumero(numero) {
    let valor;
    do {
      valor = parseFloat(prompt(`Ingresa tu ${numero}:`));
      if (isNaN(valor)) {
        alert(`Valor de ${numero} no válido. Ingresa un número.`);
      }
    } while (isNaN(valor));
    return valor;
  }
  
  const usuarios = [];
  

  do {
    agregarUsuario();
  } while (confirm("¿Deseas agregar otro usuario?"));
  

  console.log("Información de usuarios:");
  usuarios.forEach((usuario, index) => {
    console.log(`Usuario ${index + 1}: ${usuario.nombre}, Edad: ${usuario.edad}, Género: ${usuario.genero}, Peso: ${usuario.peso} kg, Altura: ${usuario.altura} cm`);
  });