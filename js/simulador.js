let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];

const formulario = document.getElementById("formulario-compra");
const listaCarrito = document.getElementById("carrito-lista");
const totalTexto = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar-carrito");
const selectTamaño = document.getElementById("tamaño");

async function cargarProductos() {
  try {
    const res = await fetch(
      "https://689d16a7ce755fe69787d0db.mockapi.io/productos"
    );
    productos = await res.json();
    renderOpciones();
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  }
}

function renderOpciones() {
  selectTamaño.innerHTML = `<option value="">Seleccione un tamaño</option>`;
  productos.forEach((p) => {
    selectTamaño.innerHTML += `<option value="${p.tamaño}">${p.tamaño} kilo - $${p.precio}</option>`;
  });
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const tamaño = selectTamaño.value;
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!tamaño || isNaN(cantidad) || cantidad <= 0) {
    Swal.fire("Atención", "Complete todos los campos correctamente", "warning");
    return;
  }

  carrito.push({ tamaño, cantidad });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  formulario.reset();

  mostrarCarrito();

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `${cantidad} pote(s) de ${tamaño} kilo(s) fueron añadidos al carrito.`,
    timer: 2000,
    showConfirmButton: false,
  });
});

btnVaciar.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire("Carrito vacío", "No hay productos para eliminar", "info");
    return;
  }

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los productos del carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      localStorage.removeItem("carrito");
      mostrarCarrito();
      Swal.fire("Listo", "El carrito fue vaciado", "success");
    }
  });
});

function mostrarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    const producto = productos.find((p) => p.tamaño === item.tamaño);
    if (producto) {
      const subtotal = producto.precio * item.cantidad;
      const li = document.createElement("li");
      li.textContent = `${item.cantidad} pote(s) de ${item.tamaño} kilo/s: $${subtotal}`;
      listaCarrito.appendChild(li);
      total += subtotal;
    }
  });

  totalTexto.textContent = `Total a pagar: $${total}`;
}

cargarProductos().then(mostrarCarrito);
