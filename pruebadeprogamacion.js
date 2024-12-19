// Configura el ID de la hoja y tu clave de API
const SHEET_ID = "https://docs.google.com/spreadsheets/d/1iNUtmsC1luRC7JnTSEVIZbYXdr_AV5RAoPH7JeNCJdw/edit?gid=0#gid=0&range=A1"; // ID de la hoja
const API_KEY = "AIzaSyD1S_zruzhDTLRyUEPBHbm1fMEojn9SYes"; // Tu clave de API
const SHEET_NAME = "Simulacion TATA"; // Nombre exacto de la pestaña en la hoja

// URL para acceder a los datos
const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;


// Elemento donde mostrar los eventos
const eventList = document.getElementById("event-list");

// Función para cargar eventos desde Google Sheets
async function loadEvents() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Verifica si hay datos
    if (!data.values || data.values.length < 2) {
      eventList.innerHTML = "<p>No se encontraron eventos.</p>";
      return;
    }

    // Procesar filas (omite la primera fila si es encabezado)
    const rows = data.values.slice(1);

    // Filtrar eventos futuros
    const now = new Date();
    const upcomingEvents = rows.filter(row => new Date(row[2]) > now);

    // Mostrar los eventos en la página
    eventList.innerHTML = ""; // Limpia el contenido anterior
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
    eventList.innerHTML = "<p>Error al cargar los eventos. Revisa la consola para más detalles.</p>";
  }
}

// Llamar a la función para cargar los eventos
loadEvents();
