// Reemplaza esta URL con el endpoint que te dio Sheety
const SHEETY_URL = "https://api.sheety.co/758e3fe91df1616c0b05e2105a5e3b6f/simulacion/hoja1";

// Función para obtener los datos de Google Sheets
async function obtenerEventos() {
  try {
    const respuesta = await fetch(SHEETY_URL);
    const datos = await respuesta.json();

    // Asegúrate de que los eventos están en el objeto adecuado
    const eventos = datos.hoja1 || []; // Cambia 'eventos' por el nombre de tu hoja
    mostrarEventos(eventos);
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
  }
}

// Función para mostrar los datos en el sitio
function mostrarEventos(eventos) {
  const contenedor = document.getElementById("eventos");
  contenedor.innerHTML = "";

  eventos.forEach(evento => {
    const eventoDiv = document.createElement("div");
    eventoDiv.innerHTML = `
      <h3>${evento.nombre}</h3>
      <p><strong>Fecha:</strong> ${evento.fecha}</p>
      <p>${evento.descripcion}</p>
    `;
    contenedor.appendChild(eventoDiv);
  });
}

// Llama a la función al cargar la página
obtenerEventos();
