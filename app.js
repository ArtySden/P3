let paginaActual = "login";
let seccionActual = "tareas";
let categoriaTip = "productividad";

const usuariosUsados = [
  "annie",
  "alexandra",
  "unigo",
  "usuario123"
];

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
          <h1 class="text-4xl font-black text-purple-600">
            UG
          </h1>
        </div>

        <h2 class="mt-5 text-2xl font-black text-gray-900">
          Inicia sesión
        </h2>

        <p class="mt-2 font-semibold text-gray-700">
          Tu vida universitaria organizada
        </p>

        <input 
          id="usuarioInput"
          type="text"
          placeholder="Escribe un nombre de usuario"
          class="mt-10 w-full border border-purple-300 rounded-xl px-4 py-3 outline-none focus:border-purple-600"
        >

        <p 
          id="mensajeError"
          class="hidden mt-3 text-left text-red-500 font-semibold">
        </p>

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

  let usuario = document
    .getElementById("usuarioInput")
    .value
    .trim()
    .toLowerCase();

  let mensajeError = document.getElementById("mensajeError");

  mensajeError.classList.add("hidden");

  if (usuario === "") {

    mensajeError.classList.remove("hidden");
    mensajeError.textContent = "Escribe un nombre de usuario";

    return;
  }

  if (usuariosUsados.includes(usuario)) {

    mensajeError.classList.remove("hidden");
    mensajeError.textContent = "Este usuario ya existe";

    return;
  }

  paginaActual = "principal";

  renderizar();

}

function mostrarPaginaPrincipal() {

  app.innerHTML = `

    <main class="min-h-screen px-4 py-6">

      <section class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        <aside class="hidden lg:block w-72 bg-white rounded-[32px] shadow-xl p-6">

          <h1 class="text-5xl font-black text-morado text-center">
            UniGo
          </h1>

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

            <h3 class="font-black text-gray-800">
              Resumen rápido
            </h3>

            <p class="mt-2 text-sm text-gray-600">
              Organiza tareas, lugares, eventos y consejos para mejorar tu vida universitaria.
            </p>

          </div>

        </aside>

        <section class="w-full max-w-[430px] lg:max-w-5xl mx-auto bg-white rounded-[32px] shadow-2xl min-h-[720px] overflow-hidden">

          <header class="text-center px-5 pt-8 pb-4 border-b border-gray-200">

            <h1 class="text-4xl lg:text-5xl font-black text-morado">
              UniGo
            </h1>

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

          <p class="mt-1 text-sm text-gray-500">
            ${tarea.fecha}
          </p>

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

/* TODO LO DEMÁS DE TU JS ORIGINAL SIGUE IGUAL */

renderizar();
