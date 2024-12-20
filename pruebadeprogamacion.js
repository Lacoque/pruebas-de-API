// Configura el ID de la hoja y tu clave de API
const SHEET_ID = "1iNUtmsC1luRC7JnTSEVIZbYXdr_AV5RAoPH7JeNCJdw"; // ID de la hoja
const API_KEY = "AIzaSyD12vRNA2cedT12RB3RJazOSxCj3NiaHg8"; // Tu clave de API
const SHEET_NAME = "SimulacionTATA"; // Nombre exacto de la pestaña en la hoja

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

async function loadEvents() {
  try {
    console.log("URL de la API:", API_URL);
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos:", data);

    if (!data.values || data.values.length < 2) {
      eventList.innerHTML = "<p>No se encontraron eventos.</p>";
      return;
    }

    const rows = data.values.slice(1); // Omite la fila de encabezados
    const now = new Date();
    const upcomingEvents = rows.filter(row => {
      const eventDate = new Date(row[2]);
      return eventDate > now && !isNaN(eventDate);
    });

    eventList.innerHTML = ""; // Limpia la lista anterior
    if (upcomingEvents.length > 0) {
      upcomingEvents.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `
          <h2>${event[0]}</h2>
          <p>${event[1]}</p>
          <p><strong>Fecha:</strong> ${new Date(event[2]).toLocaleString()}</p>
        `;
        eventList.appendChild(eventElement);
      });
    } else {
      eventList.innerHTML = "<p>No hay eventos próximos.</p>";
    }
  } catch (error) {
    console.error("Error al cargar los eventos:", error);
    eventList.innerHTML = `<p>Error al cargar los eventos: ${error.message}</p>`;
  }
}

// Llamar a la función
loadEvents();
setInterval(loadEvents, 30000);

