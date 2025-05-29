let todasLasPreguntas = [];
const numeroGrupo1 = document.getElementById("grupoSelect");

fetch('../preguntas.json')
  .then(response => response.json())
  .then(preguntas => {
    todasLasPreguntas = preguntas;

    numeroGrupo1.addEventListener("change", (e) => {
      mostrarSegunSeleccion(e.target.value);
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));


function mostrarSegunSeleccion(valor) {
  let num = parseInt(valor, 10);
  if (num === 0) {
    const preguntasSimulacro = obtenerPreguntasAleatorias(todasLasPreguntas, 30);
    mostrarPreguntasLista(preguntasSimulacro);

  } else {
    mostrarPreguntas(num);
  }
}



function mostrarPreguntas(numeroGrupo) {
  const form = document.getElementById("quizForm");
  const result = document.getElementById("result");
  const preguntasDiv = document.getElementById("questions");


  preguntasDiv.innerHTML = "";
  result.innerHTML = "";

  const tamañoGrupo = 10;
  const grupo = dividirEnGrupos(todasLasPreguntas, tamañoGrupo)[numeroGrupo - 1];

  let contador = 0;
  let contadorPractico = numeroGrupo;

  grupo.forEach((pregunta, i) => {
    const div = document.createElement("div");
    div.classList.add("mb-4", "p-3", "border", "rounded", "bg-white", "shadow-sm");

    div.innerHTML = `<strong>${pregunta.texto}</strong><br>
        <div class="mt-3 text-center">
          <img src="../images/multiple${contadorPractico}/image${contador}.png" class="img-fluid rounded" alt="Imagen de la pregunta ${i}">
        </div>`;

    pregunta.opciones.forEach((opcion, j) => {
      div.innerHTML += `
              <div class="form-check"><br>
                <input class="form-check-input" type="radio" name="pregunta${i}" id="p${i}o${j}" value="${j}">
                <label class="form-check-label" for="p${i}o${j}">${opcion}</label>
              </div>
            `;
    });

    contador++;
    preguntasDiv.appendChild(div);
  });

  form.onsubmit = function (e) {
    e.preventDefault();
    let puntaje = 0;
    grupo.forEach((pregunta, i) => {
      const selected = document.querySelector(`input[name="pregunta${i}"]:checked`);
      const opciones = document.querySelectorAll(`input[name="pregunta${i}"]`);

      if (selected) {
        const idx = parseInt(selected.value);
        if (idx === pregunta.correcta) {
          puntaje++;
          selected.parentElement.classList.add("correct");
        } else {
          selected.parentElement.classList.add("incorrect");
          opciones[pregunta.correcta].parentElement.classList.add("correct");
        }
      } else {
        opciones[pregunta.correcta].parentElement.classList.add("correct");
      }
    });

    result.innerHTML = `<div class="alert alert-info">Respuestas correctas: <strong>${puntaje}</strong> de ${grupo.length}</div>`;
  };
}
function dividirEnGrupos(array, tamañoGrupo) {
  const grupos = [];
  for (let i = 0; i < array.length; i += tamañoGrupo) {
    grupos.push(array.slice(i, i + tamañoGrupo));
  }
  return grupos;
}


function obtenerPreguntasAleatorias(preguntas, cantidad) {
  const preguntasCopia = [...preguntas];
  const seleccionadas = [];

  while (seleccionadas.length < cantidad && preguntasCopia.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * preguntasCopia.length);
    seleccionadas.push(preguntasCopia[indiceAleatorio]);
    preguntasCopia.splice(indiceAleatorio, 1);
  }

  return seleccionadas;
}
function mostrarPreguntasLista(preguntas) {
  const form = document.getElementById("quizForm");
  const result = document.getElementById("result");
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = '';

  preguntas.forEach((pregunta, i) => {
    const div = document.createElement("div");
    div.classList.add("mb-4", "p-3", "border", "rounded", "bg-white", "shadow-sm");
    div.innerHTML = `<strong>${pregunta.texto}</strong><br>`;

    pregunta.opciones.forEach((opcion, j) => {
      div.innerHTML += `
        <div class="form-check"><br>
                <input class="form-check-input" type="radio" name="pregunta${i}" id="p${i}o${j}" value="${j}">
                <label class="form-check-label" for="p${i}o${j}">${opcion}</label>
              </div>
      `;
    });

    questionsDiv.appendChild(div);
  });

  form.onsubmit = function (e) {
    e.preventDefault();
    let puntaje = 0;
    preguntas.forEach((pregunta, i) => {
      const selected = document.querySelector(`input[name="pregunta${i}"]:checked`);
      const opciones = document.querySelectorAll(`input[name="pregunta${i}"]`);

      if (selected) {
        const idx = parseInt(selected.value);
        if (idx === pregunta.correcta) {
          puntaje++;
          selected.parentElement.classList.add("correct");
        } else {
          selected.parentElement.classList.add("incorrect");
          opciones[pregunta.correcta].parentElement.classList.add("correct");
        }
      } else {
        opciones[pregunta.correcta].parentElement.classList.add("correct");
      }
    });

    result.innerHTML = `<div class="alert alert-info">Respuestas correctas: <strong>${puntaje}</strong> de ${preguntas.length}</div>`;
  };
}
