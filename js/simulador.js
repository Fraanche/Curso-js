const precios = {
  "1/4": 2500,
  "1/2": 4800,
  1: 9400,
  2: 18200,
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const formulario = document.getElementById("formulario-compra");
const listaCarrito = document.getElementById("carrito-lista");
const totalTexto = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar-carrito");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const tamaño = document.getElementById("tamaño").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!tamaño || isNaN(cantidad) || cantidad <= 0) return;

  carrito.push({ tamaño, cantidad });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  formulario.reset();

  mostrarCarrito();
});

btnVaciar.addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
});

function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    const subtotal = precios[item.tamaño] * item.cantidad;
    li.textContent = `${item.cantidad} pote(s) de ${item.tamaño} kilo/s: $${subtotal}`;
    listaCarrito.appendChild(li);
    total += subtotal;
  });

  totalTexto.textContent = `Total a pagar: $${total}`;
}

mostrarCarrito();
