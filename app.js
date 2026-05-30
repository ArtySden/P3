let paginaActual = "login";
let seccionActual = "tareas";
let categoriaTip = "productividad";

const app = document.getElementById("app");

function renderizar() {
  if (paginaActual === "login") {
    mostrarLogin();
  } else {
    mostrarPaginaPrincipal();
  }
}

function mostrarLogin() {
  app.innerHTML = `
    <main class="min-h-screen flex items-center justify-center px-4 py-8">
      <section class="w-full max-w-md bg-white rounded-[32px] shadow-2xl p-8 text-center">

        <div class="mx-auto w-24 h-24 bg-suave rounded-3xl flex items-center justify-center">
          <h1 class="text-4xl font-black text-purple-600">UG</h1>
        </div>

        <h2 class="mt-5 text-2xl font-black text-gray-900">
          Inicia sesión
        </h2>

        <p class="mt-2 font-semibold text-gray-700">
          Tu vida universitaria organizada
        </p>

        <input 
          type="text"
          placeholder="Introduzca un nombre de usuario"
          class="mt-10 w-full border border-purple-300 rounded-xl px-4 py-3 outline-none focus:border-purple-600"
        >

        <button 
          onclick="entrar()"
          class="mt-4 w-full bg-purple-300 hover:bg-purple-400 rounded-xl px-4 py-3 font-bold text-gray-700 transition">
          Continuar
        </button>

        <p class="mt-12 text-xs text-gray-500">
          Términos de uso y Política de privacidad
        </p>
      </section>
    </main>
  `;
}

function entrar() {
  paginaActual = "principal";
  renderizar();
}

function mostrarPaginaPrincipal() {
  app.innerHTML = `
    <main class="min-h-screen px-4 py-6">
      <section class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        <aside class="hidden lg:block w-72 bg-white rounded-[32px] shadow-xl p-6">
          <h1 class="text-5xl font-black text-morado text-center">UniGo</h1>
          <p class="mt-2 text-center text-sm text-gray-500">
            Tu vida universitaria, organizada.
          </p>

          <div class="mt-8 space-y-3">
            ${botonLateral("tareas", "□", "Tareas")}
            ${botonLateral("comida", "○", "Comida")}
            ${botonLateral("eventos", "▣", "Eventos")}
            ${botonLateral("lugares", "◇", "Lugares")}
            ${botonLateral("tips", "▥", "Tips")}
          </div>

          <div class="mt-10 bg-suave rounded-2xl p-4">
            <h3 class="font-black text-gray-800">Resumen rápido</h3>
            <p class="mt-2 text-sm text-gray-600">
              Organiza tareas, lugares, eventos y consejos para mejorar tu vida universitaria.
            </p>
          </div>
        </aside>

        <section class="w-full max-w-[430px] lg:max-w-5xl mx-auto bg-white rounded-[32px] shadow-2xl min-h-[720px] overflow-hidden">

          <header class="text-center px-5 pt-8 pb-4 border-b border-gray-200">
            <h1 class="text-4xl lg:text-5xl font-black text-morado">UniGo</h1>
            <p class="mt-2 text-sm lg:text-base text-gray-500">
              Tu vida universitaria, organizada.
            </p>
          </header>

          <nav class="flex gap-2 overflow-x-auto px-3 py-3 border-b border-gray-200">
            ${botonSuperior("tareas", "□", "Tareas")}
            ${botonSuperior("comida", "○", "Comida")}
            ${botonSuperior("eventos", "▣", "Eventos")}
            ${botonSuperior("lugares", "◇", "Lugares")}
            ${botonSuperior("tips", "▥", "Tips")}
          </nav>

          <div id="contenido" class="p-5 lg:p-8"></div>
        </section>
      </section>
    </main>
  `;

  mostrarContenido();
}

function botonLateral(id, icono, texto) {
  let activo = seccionActual === id;

  return `
    <button 
      onclick="cambiarSeccion('${id}')"
      class="w-full text-left px-4 py-3 rounded-2xl font-semibold transition
      ${activo ? "bg-suave text-purple-700" : "text-gray-600 hover:bg-gray-100"}">
      <span class="mr-2">${icono}</span>${texto}
    </button>
  `;
}

function botonSuperior(id, icono, texto) {
  let activo = seccionActual === id;

  return `
    <button 
      onclick="cambiarSeccion('${id}')"
      class="min-w-max px-3 py-2 rounded-full text-sm font-medium transition
      ${activo ? "bg-suave text-purple-700" : "text-gray-700 hover:bg-gray-100"}">
      <span>${icono}</span> ${texto}
    </button>
  `;
}

function cambiarSeccion(seccion) {
  seccionActual = seccion;
  mostrarPaginaPrincipal();
}

function mostrarContenido() {
  const contenido = document.getElementById("contenido");

  if (seccionActual === "tareas") {
    contenido.innerHTML = vistaTareas();
  }

  if (seccionActual === "comida") {
    contenido.innerHTML = vistaComida();
  }

  if (seccionActual === "eventos") {
    contenido.innerHTML = vistaEventos();
  }

  if (seccionActual === "lugares") {
    contenido.innerHTML = vistaLugares();
  }

  if (seccionActual === "tips") {
    contenido.innerHTML = vistaTips();
  }
}

/* =========================
   TAREAS
========================= */

function vistaTareas() {
  let pendientes = 0;
  let completadas = 0;

  for (let i = 0; i < datos.tareas.length; i++) {
    if (datos.tareas[i].estado === "pendiente") {
      pendientes++;
    } else {
      completadas++;
    }
  }

  let tarjetas = `
    <button
      onclick="abrirModalTarea()"
      class="bg-purple-300 hover:bg-purple-400 text-white text-3xl font-black rounded-xl p-4 h-[90px] transition">
      +
    </button>
  `;

  for (let i = 0; i < datos.tareas.length; i++) {
    let tarea = datos.tareas[i];

    tarjetas += `
      <article class="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        
        <div>
          <h3 class="font-bold ${tarea.estado === "completada" ? "line-through text-gray-400" : "text-gray-800"}">
            ${tarea.favorito ? "⭐ " : ""}
            ${tarea.titulo}
          </h3>

          <p class="mt-1 text-sm text-gray-500">
            ${tarea.fecha}
          </p>
        </div>

        <button
          onclick="abrirDetalleTarea(${i})"
          class="bg-oscuro hover:bg-black text-white font-bold px-4 py-2 rounded-lg text-sm">
          Entrar
        </button>
      </article>
    `;
  }

  return `
    <section class="relative">

      <div id="modalTarea"></div>

      <h2 class="mb-5 text-xl font-black text-gray-900">
        Tareas universitarias
      </h2>

      <div class="bg-suave rounded-[32px] p-4">
        <div class="grid gap-4 lg:grid-cols-2">
          ${tarjetas}
        </div>
      </div>

      <div class="mt-5 grid gap-4 sm:grid-cols-2">

        <div class="bg-rosado rounded-3xl py-4 text-center text-xl font-black">
          ${pendientes} Tareas Pendientes
        </div>

        <div class="bg-verde rounded-3xl py-4 text-center text-xl font-black">
          ${completadas} Completada
        </div>

      </div>

    </section>
  `;
}

function abrirModalTarea() {
  const modal = document.getElementById("modalTarea");

  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div class="bg-white w-full max-w-md rounded-[32px] p-6 shadow-2xl">

        <h2 class="text-2xl font-black text-gray-900 mb-5">
          Agrega un curso
        </h2>

        <div class="space-y-4">

          <input
            type="text"
            id="nombreCurso"
            placeholder="Nombre del curso"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          >

          <input
            type="file"
            id="archivoCurso"
            class="w-full border border-gray-300 rounded-xl px-4 py-3"
          >

          <input
            type="date"
            id="fechaCurso"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          >

        </div>

        <div class="mt-6 flex gap-3 justify-end">

          <button
            onclick="cerrarModalTarea()"
            class="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold transition">
            Cancelar
          </button>

          <button
            onclick="guardarTarea()"
            class="px-5 py-3 rounded-xl bg-purple-400 hover:bg-purple-500 text-white font-bold transition">
            Guardar
          </button>

        </div>

      </div>

    </div>
  `;
}

function cerrarModalTarea() {
  const modal = document.getElementById("modalTarea");
  modal.innerHTML = "";
}

function abrirDetalleTarea(indice) {
  const tarea = datos.tareas[indice];
  const modal = document.getElementById("modalTarea");

  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div class="bg-white w-full max-w-2xl rounded-[32px] p-6 shadow-2xl">

        <div class="flex justify-between items-center">

          <h2 class="text-2xl font-black">
            ${tarea.titulo}
          </h2>

          <button
            onclick="toggleFavorito(${indice})"
            class="text-3xl">
            ${tarea.favorito ? "⭐" : "☆"}
          </button>

        </div>

        <div class="mt-6">

          <h3 class="font-bold">
            Documento:
          </h3>

          ${
            tarea.archivo
              ? `
                <a
                  href="${tarea.archivo}"
                  target="_blank"
                  class="text-blue-600 underline">
                  ${tarea.nombreArchivo}
                </a>
              `
              : `
                <p>No hay documento.</p>
              `
          }

        </div>

        <div class="mt-8 flex gap-3">

          <button
            onclick="cambiarEstado(${indice}, 'completada')"
            class="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold">
            Completada
          </button>

          <button
            onclick="cambiarEstado(${indice}, 'pendiente')"
            class="flex-1 bg-red-400 text-white py-3 rounded-xl font-bold">
            Sin completar
          </button>

        </div>

        <button
          onclick="cerrarModalTarea()"
          class="mt-5 w-full bg-gray-200 py-3 rounded-xl font-bold">
          Cerrar
        </button>

      </div>

    </div>
  `;
}

function toggleFavorito(indice) {
  datos.tareas[indice].favorito = !datos.tareas[indice].favorito;
  abrirDetalleTarea(indice);
}

function cambiarEstado(indice, estado) {
  datos.tareas[indice].estado = estado;

  cerrarModalTarea();
  mostrarContenido();
}

function guardarTarea() {
  const nombre = document.getElementById("nombreCurso").value;
  const fecha = document.getElementById("fechaCurso").value;

  if (nombre === "" || fecha === "") {
    alert("Completa los campos");
    return;
  }

  const archivo = document.getElementById("archivoCurso").files[0];

  datos.tareas.push({
    titulo: nombre,
    fecha: fecha,
    estado: "pendiente",
    favorito: false,
    archivo: archivo ? URL.createObjectURL(archivo) : null,
    nombreArchivo: archivo ? archivo.name : "Sin archivo"
  });

  cerrarModalTarea();
  mostrarContenido();
}

/* =========================
   COMIDA
========================= */

function vistaComida() {
  return `
    <section>
      <div id="modalComida"></div>

      <div class="mb-5 flex flex-col sm:flex-row gap-3 sm:items-center">
        <button class="w-12 h-12 bg-oscuro text-white rounded-full font-bold">
          ☆
        </button>

        <input 
          type="text"
          id="buscadorComida"
          onkeyup="buscarComida()"
          placeholder="Busca comida: pizza, menú, café, sushi..."
          class="flex-1 border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-purple-500">
      </div>

      <div class="border border-gray-200 rounded-xl p-5 shadow-md">
        <p class="text-sm text-gray-500">Lugares para comer.</p>

        <h2 class="mt-2 font-black text-gray-900">
          Encuentra opciones económicas cerca del campus:
        </h2>

        <div id="listaComidas" class="mt-5">
          ${generarListaComidas(datos.comidas)}
        </div>
      </div>
    </section>
  `;
}

function generarListaComidas(listaComidas) {
  let lista = "";

  if (listaComidas.length === 0) {
    return `
      <div class="text-center py-10">
        <p class="text-4xl">⌕</p>
        <h3 class="mt-3 font-black text-gray-800">
          No se encontró esa comida
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Intenta buscar pizza, café, menú, sushi, hamburguesa, tacos, pollo, chifa, jugo o postres.
        </p>
      </div>
    `;
  }

  for (let i = 0; i < listaComidas.length; i++) {
    let comida = listaComidas[i];
    let indiceOriginal = datos.comidas.indexOf(comida);

    lista += `
      <article 
        onclick="abrirDetalleComida(${indiceOriginal})"
        class="py-4 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-purple-50 rounded-xl px-3 transition">
        
        <div class="flex items-start gap-3">
          <span class="text-xl">☆</span>

          <div class="flex-1">
            <h3 class="font-bold text-gray-800">${comida.nombre}</h3>
            <p class="text-sm text-gray-500">${comida.descripcion}</p>
            <p class="mt-1 text-sm font-semibold text-purple-700">${comida.oferta}</p>
            <p class="mt-1 text-xs text-gray-400">${comida.direccion}</p>
          </div>

          <span class="font-bold text-purple-700">Ver</span>
        </div>
      </article>
    `;
  }

  return lista;
}

function buscarComida() {
  const input = document.getElementById("buscadorComida");
  const listaComidas = document.getElementById("listaComidas");

  const textoBusqueda = input.value.toLowerCase().trim();

  const comidasFiltradas = datos.comidas.filter((comida) => {
    const textoComida = `
      ${comida.nombre}
      ${comida.descripcion}
      ${comida.oferta}
      ${comida.categoria}
      ${comida.direccion}
    `.toLowerCase();

    return textoComida.includes(textoBusqueda);
  });

  listaComidas.innerHTML = generarListaComidas(comidasFiltradas);
}

function abrirDetalleComida(indice) {
  const comida = datos.comidas[indice];
  const modal = document.getElementById("modalComida");

  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div class="bg-white w-full max-w-5xl rounded-[32px] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">

        <div class="flex justify-between items-start gap-4">
          <div>
            <p class="text-sm font-bold text-purple-600">${comida.categoria}</p>

            <h2 class="text-2xl lg:text-3xl font-black text-gray-900">
              ${comida.nombre}
            </h2>

            <p class="mt-2 text-gray-500">
              ${comida.descripcion}
            </p>
          </div>

          <button
            onclick="cerrarModalComida()"
            class="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-full font-black">
            X
          </button>
        </div>

        <div class="mt-6 grid gap-6 lg:grid-cols-2">

          <div class="space-y-4">

            <div class="bg-suave rounded-2xl p-4">
              <h3 class="font-black text-gray-900">Oferta</h3>
              <p class="mt-1 text-purple-700 font-bold">${comida.oferta}</p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4">
              <h3 class="font-black text-gray-900">Dirección</h3>
              <p class="mt-1 text-gray-600">${comida.direccion}</p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4">
              <h3 class="font-black text-gray-900">Horario</h3>
              <p class="mt-1 text-gray-600">${comida.horario}</p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4">
              <h3 class="font-black text-gray-900">Referencia</h3>
              <p class="mt-1 text-gray-600">${comida.referencia}</p>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4">
              <h3 class="font-black text-gray-900">Teléfono</h3>
              <p class="mt-1 text-gray-600">${comida.telefono}</p>
            </div>

          </div>

          <div class="rounded-3xl overflow-hidden border border-gray-200 shadow-md min-h-[360px]">
            <iframe
              src="https://maps.google.com/maps?q=${comida.latitud},${comida.longitud}&z=16&output=embed"
              width="100%"
              height="360"
              style="border:0;"
              loading="lazy"
              allowfullscreen>
            </iframe>
          </div>

        </div>

        <button
          onclick="cerrarModalComida()"
          class="mt-6 w-full bg-purple-400 hover:bg-purple-500 text-white py-3 rounded-xl font-bold transition">
          Cerrar detalle
        </button>

      </div>

    </div>
  `;
}

function cerrarModalComida() {
  const modal = document.getElementById("modalComida");
  modal.innerHTML = "";
}

/* =========================
   EVENTOS
========================= */

function vistaEventos() {
  let tarjetas = "";

  for (let i = 0; i < datos.eventos.length; i++) {
    let evento = datos.eventos[i];

    tarjetas += `
      <article class="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
        
        <img 
          src="${evento.imagen}" 
          alt="${evento.titulo}"
          class="w-full h-40 object-cover"
        >

        <div class="p-4">
          <span class="inline-block bg-yellow-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            ${evento.tipo}
          </span>

          <h3 class="text-lg font-bold text-gray-900">
            ${evento.titulo}
          </h3>

          <p class="mt-2 text-sm font-semibold text-gray-700">
            ${evento.descripcion}
          </p>

          <p class="mt-3 text-xs text-gray-500">
            ${evento.fecha}
          </p>
        </div>
      </article>
    `;
  }

  return `
    <section>
      <h2 class="mb-5 text-xl font-black text-gray-900">
        Eventos Juveniles
      </h2>

      <div class="grid gap-5 lg:grid-cols-3">
        ${tarjetas}
      </div>
    </section>
  `;
}

/* =========================
   LUGARES
========================= */

function vistaLugares() {
  let tarjetas = "";

  for (let i = 0; i < datos.lugares.length; i++) {
    let lugar = datos.lugares[i];

    let servicios = "";

    for (let j = 0; j < lugar.servicios.length; j++) {
      servicios += `<li>• ${lugar.servicios[j]}</li>`;
    }

    tarjetas += `
      <article class="bg-white border border-gray-200 rounded-xl shadow-md p-5">
        <div class="flex justify-between">
          <h3 class="font-black text-gray-900">${lugar.nombre}</h3>
          <span class="text-sm text-gray-500">Gratis</span>
        </div>

        <p class="mt-4 text-gray-500">• ${lugar.horario}</p>

        <ul class="mt-3 space-y-2 text-gray-600">
          ${servicios}
        </ul>
      </article>
    `;
  }

  return `
    <section>
      <h2 class="mb-5 text-xl font-black text-gray-900">
        Sitios útiles
      </h2>

      <div class="grid gap-5 lg:grid-cols-3">
        ${tarjetas}
      </div>
    </section>
  `;
}

/* =========================
   TIPS
========================= */

function vistaTips() {
  let botones = `
    <div class="mb-5 flex rounded-full bg-gray-300 p-1">
      ${botonCategoria("productividad")}
      ${botonCategoria("memorizacion")}
      ${botonCategoria("bienestar")}
    </div>
  `;

  let tarjetas = "";

  let listaTips = datos.tips[categoriaTip];

  for (let i = 0; i < listaTips.length; i++) {
    let tip = listaTips[i];

    let puntos = "";

    for (let j = 0; j < tip.puntos.length; j++) {
      puntos += `<li>• ${tip.puntos[j]}</li>`;
    }

    let colorBorde = "border-purple-400";

    if (categoriaTip === "memorizacion") {
      colorBorde = "border-blue-400";
    }

    if (categoriaTip === "bienestar") {
      colorBorde = "border-green-400";
    }

    tarjetas += `
      <article class="border ${colorBorde} p-5">
        <h3 class="text-lg font-black text-gray-900">
          ${tip.titulo}
        </h3>

        <p class="font-semibold text-gray-700">
          ${tip.subtitulo}
        </p>

        <ul class="mt-3 space-y-2 text-sm text-gray-600">
          ${puntos}
        </ul>
      </article>
    `;
  }

  return `
    <section>
      ${botones}

      <div class="grid gap-5 lg:grid-cols-2">
        ${tarjetas}
      </div>
    </section>
  `;
}

function botonCategoria(categoria) {
  let activo = categoriaTip === categoria;

  return `
    <button 
      onclick="cambiarCategoriaTip('${categoria}')"
      class="flex-1 rounded-full px-3 py-3 text-sm font-bold capitalize transition
      ${activo ? "bg-white text-gray-900 shadow" : "text-gray-700"}">
      ${categoria}
    </button>
  `;
}

function cambiarCategoriaTip(categoria) {
  categoriaTip = categoria;
  mostrarContenido();
}

renderizar();
