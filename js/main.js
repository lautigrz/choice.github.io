fetch('../preguntas.json')
  .then(response => response.json())
  .then(data => {
    const form = document.getElementById("quizForm");
    const result = document.getElementById("result");
    const questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = '';

    let preguntasTodas = [];
    // Recorremos cada clave (multiple1, multiple2, ...)
    Object.keys(data).forEach(key => {
      preguntasTodas = preguntasTodas.concat(data[key]);
    });

    preguntasTodas.forEach((pregunta, i) => {
     
      const div = document.createElement("div");
      div.classList.add("mb-4", "p-3", "rounded", "fondo", "shadow-sm");

      div.innerHTML = `<strong>${pregunta.texto}</strong><br>
        <div class="mt-3 text-center">
          <img src="images/multiple${pregunta.multiple}/image${pregunta.id}.png" class="img-fluid rounded" alt="Imagen de la pregunta ${i}">
        </div>
      `;

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

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let score = 0;

      preguntasTodas.forEach((pregunta, i) => {
        const selected = document.querySelector(`input[name="pregunta${i}"]:checked`);
        const opciones = document.querySelectorAll(`input[name="pregunta${i}"]`);

        if (selected) {
          const idx = parseInt(selected.value);
          if (idx === pregunta.correcta) {
            score++;
            selected.parentElement.classList.add("correct");
          } else {
            selected.parentElement.classList.add("incorrect");
            opciones[pregunta.correcta].parentElement.classList.add("correct");
          }
        } else {
          opciones[pregunta.correcta].parentElement.classList.add("correct");
        }
      });

      result.innerHTML = `<div class="alert alert-info">Respuestas correctas: <strong>${score}</strong> de ${preguntasTodas.length}</div>`;
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));
