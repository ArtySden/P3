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

  let tarjetas = "";

  for (let i = 0; i < datos.tareas.length; i++) {
    let tarea = datos.tareas[i];

    tarjetas += `
      <article class="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <h3 class="font-bold ${tarea.estado === "completada" ? "line-through text-gray-400" : "text-gray-800"}">
            ${tarea.titulo}
          </h3>
          <p class="mt-1 text-sm text-gray-500">${tarea.fecha}</p>
        </div>

        <button class="bg-oscuro hover:bg-black text-white font-bold px-4 py-2 rounded-lg text-sm">
          Entrar
        </button>
      </article>
    `;
  }

  return `
    <section>
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

function vistaComida() {
  let lista = "";

  for (let i = 0; i < datos.comidas.length; i++) {
    let comida = datos.comidas[i];

    lista += `
      <article class="py-4 border-b border-gray-200 last:border-b-0">
        <div class="flex items-start gap-3">
          <span class="text-xl">☆</span>

          <div class="flex-1">
            <h3 class="font-bold text-gray-800">${comida.nombre}</h3>
            <p class="text-sm text-gray-500">${comida.descripcion}</p>
            <p class="mt-1 text-sm font-semibold text-purple-700">${comida.oferta}</p>
          </div>

          <span class="font-bold">⌂ A</span>
        </div>
      </article>
    `;
  }

  return `
    <section>
      <div class="mb-5 flex flex-col sm:flex-row gap-3 sm:items-center">
        <button class="w-12 h-12 bg-oscuro text-white rounded-full font-bold">
          ☆
        </button>

        <input 
          type="text"
          placeholder="¿Dónde estás buscando?"
          class="flex-1 border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-purple-500">
      </div>

      <div class="border border-gray-200 rounded-xl p-5 shadow-md">
        <p class="text-sm text-gray-500">Lugares para comer.</p>

        <h2 class="mt-2 font-black text-gray-900">
          Encuentra opciones económicas cerca del campus:
        </h2>

        <div class="mt-5">
          ${lista}
        </div>
      </div>
    </section>
  `;
}

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
