// Reemplaza esta URL con el endpoint que te dio Sheety
const SHEETY_URL = "https://api.sheety.co/758e3fe91df1616c0b05e2105a5e3b6f/programacion/martes";

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
    <p>${evento.localidad}</p>
    <p><strong>Hora:</strong> ${evento.hora}</p>
    <h3>${evento.obra}</h3>
    <p>${evento.grupo}</p>
    `;
    contenedor.appendChild(eventoDiv);
  });
}

// Llama a la función al cargar la página
obtenerEventos();
// Refresca los datos automáticamente cada 10 segundos (10000 ms)
//const REFRESH_INTERVAL = 10000;
//setInterval(obtenerEventos, REFRESH_INTERVAL);
