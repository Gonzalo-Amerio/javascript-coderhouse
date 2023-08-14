  const edad = parseInt(prompt("Ingresa tu edad:"));
  const peso = parseFloat(prompt("Ingresa tu peso en kg:"));
  const altura = parseFloat(prompt("Ingresa tu altura en cm:"));
  const genero = validacionGenero();
  
  const metabolismoBasal = calcularMetabolismoBasal(edad, peso, altura, genero);

function calcularMetabolismoBasal(edad, peso, altura, genero) {
    let metabolismoBasal;
  
    if (genero === "hombre") {
      metabolismoBasal = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * edad;
    } else  (genero === "mujer");
      metabolismoBasal = 447.593 + 9.247 * peso + 3.098 * altura - 4.330 * edad; 
    return (metabolismoBasal);
}

  
  function validacionGenero() {
    let genero;
    do {
      genero = prompt("Ingresa tu género (hombre/mujer):");
      if(genero !== "hombre" && genero !== "mujer")
      alert("No ingresaste el dato correspondiente")
    } while (genero !== "hombre" && genero !== "mujer");
    return genero;
  }
  


  alert("Tu metabolismo basal es: " + Math.round(metabolismoBasal) + " calorías por día.");
  console.log("Tu metabolismo basal es: " + Math.round(metabolismoBasal) + " calorías por día");
  