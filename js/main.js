fetch('./preguntas.json')
  .then(response => response.json())
  .then(preguntas => {
   const form = document.getElementById("quizForm");
        const result = document.getElementById("result");
        const questionsDiv = document.getElementById("questions");
        var contador = 0;
        var contadorPractico = 1;
        preguntas.forEach((pregunta, i) => {
            const div = document.createElement("div");
           
            div.classList.add("mb-4", "p-3", "border", "rounded", "bg-white", "shadow-sm");

    
            div.innerHTML = `<strong>${pregunta.texto}</strong><br>`;
           
                div.innerHTML += `
        <div class="mt-3 text-center">
          <img src="images/multiple${contadorPractico}/image${contador}.png" class="img-fluid rounded" alt="Imagen de la pregunta ${i}">
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


            contador++;

            if (contador == 10) {

                contadorPractico++;
                contador = 0;
            }


            questionsDiv.appendChild(div);
        });

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let score = 0;
            preguntas.forEach((pregunta, i) => {
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

            result.innerHTML = `<div class="alert alert-info">Respuestas correctas: <strong>${score}</strong> de ${preguntas.length}</div>`;
        });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

        