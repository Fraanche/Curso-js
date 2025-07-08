const precios = {
  "1/4": 2500,
  "1/2": 4800,
  1: 9400,
  2: 18200,
};

let carrito = [];

function selecProducto() {
  let opciones =
    "¿Qué tamaño de miel desea comprar?\n1. 1/4 kilo ($2500)\n2. 1/2 kilo ($4800)\n3. 1 kilo ($9400)\n4. 2 kilos ($18200)\nEscriba el número de la opción que quiera:";
  let eleccion = prompt(opciones);

  switch (eleccion) {
    case "1":
      return "1/4";
    case "2":
      return "1/2";
    case "3":
      return "1";
    case "4":
      return "2";
    default:
      alert(
        "Opción no válida, por favor elija una de las que aparecen en pantalla."
      );
      return selecProducto();
  }
}

function pedirCant(tamaño) {
  let cantidad = parseInt(prompt(`¿Cuántos potes desea comprar?`));

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Cantidad inválida. Intente nuevamente.");
    return pedirCant(tamaño);
  }

  return cantidad;
}

function calcularTotal(carrito) {
  let total = 0;
  for (let item of carrito) {
    total += precios[item.tamaño] * item.cantidad;
  }
  return total;
}

function iniciarSimulador() {
  let seguir = true;

  while (seguir) {
    let tamaño = selecProducto();
    let cantidad = pedirCant(tamaño);

    carrito.push({ tamaño, cantidad });
    console.log(`Agregado: ${cantidad} pote(s) de ${tamaño} kilo/s`);

    seguir = confirm("¿Desea agregar otro tamaño de miel?");
  }

  let total = calcularTotal(carrito);

  let mensaje = "Gracias por su compra.\nResumen:\n";
  for (let item of carrito) {
    mensaje += `- ${item.cantidad} pote(s) de ${item.tamaño} kilo/s: $${
      item.cantidad * precios[item.tamaño]
    }\n`;
  }
  mensaje += `\nTotal a pagar: $${total}`;
  alert(mensaje);

  console.log("Carrito final:", carrito);
  console.log("Total:", total);
}

iniciarSimulador();
