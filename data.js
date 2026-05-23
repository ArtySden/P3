const datos = {
  tareas: [
    {
      titulo: "Resolver Test 1 de Inglés",
      fecha: "18/03/26 - 19/03/26",
      estado: "pendiente"
    },
    {
      titulo: "Estudiar para Cálculo 1",
      fecha: "Hasta 23/03/26",
      estado: "pendiente"
    },
    {
      titulo: "Resolver Álgebra Lineal",
      fecha: "Hasta 26/03/26",
      estado: "pendiente"
    },
    {
      titulo: "Leer Lectura 1 de Economía",
      fecha: "Hasta 21/06/26",
      estado: "pendiente"
    },
    {
      titulo: "Revisar apuntes de Programación",
      fecha: "Completada",
      estado: "completada"
    }
  ],

  comidas: [
    {
      nombre: "Café del Campus",
      descripcion: "Desayunos y snacks a precios estudiantiles.",
      oferta: "Menú desde S/ 8.00"
    },
    {
      nombre: "Pizzería Studenti",
      descripcion: "2x1 en pizzas con credencial universitaria.",
      oferta: "Promoción estudiantil"
    },
    {
      nombre: "Tacos El Rápido",
      descripcion: "Comida rápida cerca del campus.",
      oferta: "Combos desde S/ 10.00"
    },
    {
      nombre: "Burger Student",
      descripcion: "Hamburguesas con descuento para estudiantes.",
      oferta: "20% OFF"
    },
    {
      nombre: "Sushi Express",
      descripcion: "Comida japonesa económica.",
      oferta: "Rolls 2x1"
    }
  ],

  eventos: [
    {
      titulo: "Torneo de Fútbol Interfacultades",
      descripcion: "Competencia amistosa entre facultades. Inscripciones abiertas.",
      fecha: "Viernes, 27 de marzo",
      tipo: "Deportivo",
      imagen: "futbol.jpg"
    },
    {
      titulo: "Fiesta de Bienvenida",
      descripcion: "Conoce nuevos estudiantes y disfruta una noche increíble.",
      fecha: "Viernes, 20 de marzo",
      tipo: "Social",
      imagen: "bienvenida.jpg"
    },
    {
      titulo: "Charla de Productividad Académica",
      descripcion: "Aprende técnicas para organizar mejor tus estudios.",
      fecha: "Lunes, 30 de marzo",
      tipo: "Académico",
      imagen: "charla.jpg"
    }
  ],

  lugares: [
    {
      nombre: "Biblioteca Central",
      horario: "7:00 - 23:00",
      servicios: ["Wifi gratis", "Salas de grupo", "Computadoras", "Espacio de comida"]
    },
    {
      nombre: "Centro de Coworking",
      horario: "8:00 - 20:00",
      servicios: ["Wifi premium", "Pizarras", "Café gratis", "Zona de lectura"]
    },
    {
      nombre: "Centro de Salud",
      horario: "8:00 - 18:00",
      servicios: ["Atención básica", "Primeros auxilios", "Orientación médica"]
    }
  ],

  tips: {
    productividad: [
      {
        titulo: "Técnica Pomodoro",
        subtitulo: "Trabaja en intervalos de 25 minutos.",
        puntos: [
          "Enfócate 25 minutos sin distracciones.",
          "Descansa 5 minutos después de cada sesión.",
          "Usa un temporizador para mantener disciplina."
        ]
      },
      {
        titulo: "Método SMART",
        subtitulo: "Establece metas claras y alcanzables.",
        puntos: [
          "Define exactamente qué quieres lograr.",
          "Mide tu avance con fechas o porcentajes.",
          "Alinea tus metas con tus objetivos académicos."
        ]
      },
      {
        titulo: "Elimina distracciones",
        subtitulo: "Crea un ambiente productivo.",
        puntos: [
          "Silencia notificaciones.",
          "Usa apps para bloquear redes sociales.",
          "Estudia en un lugar tranquilo."
        ]
      }
    ],

    memorizacion: [
      {
        titulo: "Repetición Espaciada",
        subtitulo: "Repasa en intervalos crecientes.",
        puntos: [
          "Repasa el mismo día que aprendes.",
          "Haz una segunda revisión al día siguiente.",
          "Realiza una última revisión al mes."
        ]
      },
      {
        titulo: "Mapas Mentales",
        subtitulo: "Organiza información visualmente.",
        puntos: [
          "Coloca el tema principal en el centro.",
          "Añade ramas con subtemas.",
          "Usa colores, símbolos y dibujos."
        ]
      },
      {
        titulo: "Enseñar a otros",
        subtitulo: "La mejor forma de aprender es explicar.",
        puntos: [
          "Explica conceptos a compañeros.",
          "Crea resúmenes sencillos.",
          "Si puedes explicarlo, lo entiendes."
        ]
      }
    ],

    bienestar: [
      {
        titulo: "Duerme bien",
        subtitulo: "El descanso mejora el aprendizaje.",
        puntos: [
          "Duerme entre 7 y 8 horas.",
          "Evita pantallas antes de dormir.",
          "Mantén un horario regular."
        ]
      },
      {
        titulo: "Alimentación saludable",
        subtitulo: "Tu cerebro necesita energía de calidad.",
        puntos: [
          "Desayuna antes de estudiar.",
          "Come frutas o frutos secos.",
          "Evita el exceso de cafeína."
        ]
      },
      {
        titulo: "Ejercicio regular",
        subtitulo: "El movimiento mejora la concentración.",
        puntos: [
          "Haz pausas activas cada hora.",
          "Camina para reducir el estrés.",
          "Practica deporte varias veces por semana."
        ]
      }
    ]
  }
};
