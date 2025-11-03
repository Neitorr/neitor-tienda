async function cargarProductos() {
  try {
    const respuesta = await fetch("products.json");
    const productos = await respuesta.json();

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach((prod, i) => {
      const card = document.createElement("div");
      card.className = "producto";
      card.innerHTML = `
        <img src="${prod.images[0]}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p class="precio">${prod.price}</p>
      `;
      contenedor.appendChild(card);

      card.addEventListener("click", () => abrirModal(prod));
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function abrirModal(prod) {
  const modal = document.getElementById("modal");
  const nombre = document.getElementById("modalNombre");
  const descripcion = document.getElementById("modalDescripcion");
  const precio = document.getElementById("modalPrecio");
  const boton = document.getElementById("modalBtn");
  const carousel = document.querySelector(".carousel-images");

  nombre.textContent = prod.name;
  descripcion.textContent = prod.description;
  precio.textContent = prod.price;
  boton.href = prod.whatsapp || "https://wa.me/54911XXXXXXXXX";

  carousel.innerHTML = "";
  prod.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    if (index === 0) img.classList.add("active");
    carousel.appendChild(img);
  });

  let index = 0;
  const imgs = carousel.querySelectorAll("img");

  document.querySelector(".next").onclick = () => {
    imgs[index].classList.remove("active");
    index = (index + 1) % imgs.length;
    imgs[index].classList.add("active");
  };

  document.querySelector(".prev").onclick = () => {
    imgs[index].classList.remove("active");
    index = (index - 1 + imgs.length) % imgs.length;
    imgs[index].classList.add("active");
  };

  modal.style.display = "flex";
}

document.getElementById("cerrarModal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

window.onclick = (e) => {
  if (e.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
};

cargarProductos();
