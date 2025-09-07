// Clase que representa una sola pregunta de la encuesta
class Pregunta {
    constructor(texto, opciones){
        this.texto = texto;
        this.opciones = opciones;
        this.opcionSeleccionada = null;
    }

    //Método para mostrar la pregunta al usuario y registrar un respuesta
    hacerPregunta(){
        let mensaje = `\n${this.texto}\n`;

        this.opciones.forEach((opcion, index) => {
            mensaje += `${index+1}. ${opcion}\n`;
        });
    let eleccion = parseInt(prompt(mensaje + "Selecciona una opción (número):"));
    while (isNaN(eleccion) || eleccion < 1 || eleccion > this.opciones.length){
        eleccion = parseInt(prompt("Opción inválida. Intenta de nuevo:\n" + mensaje));
    }
    this.opcionSeleccionada = this.opciones[eleccion - 1];

    //Mostrar en consola resultados en tiempo real
    console.log(`Respondida: ${this.texto}`);
    console.log(`Selección: ${this.opcionSeleccionada}\n`);
    }  
}

//Clase que representa toda la encuesta
class Encuesta {
    constructor(titulo) {
        this.titulo = titulo;
        this.preguntas = [];
    }

    //Agrega una pregunta al arreglo de preguntas
    agregarPregunta(pregunta){
        this.preguntas.push(pregunta);
    }

    //Ejecuta la encuesta preguntando una por una
    realizarEncuesta() {
        alert(`Comenzando la encuesta: ${this.titulo}`);
        this.preguntas.forEach(pregunta => {
            pregunta.hacerPregunta();
        });
        alert("Encuesta completada. Revisa la consola para ver los resultados.");
    }
    //Muestra las respuestas seleccionadas en la consola del navegador
    mostrarResultados(){
        console.clear();
        console.log(`Resultados de la encuesta: ${this.titulo}\n`);
        this.preguntas.forEach((pregunta, i)=>{
            console.log(`${i + 1}. ${pregunta.texto}`);
            console.log(`Respuesta: ${pregunta.opcionSelecciona}\n`);
        });
    }
}

function iniciarEncuesta(){
    alert("Bienvenido al creador de encuestas");

    const titulo = prompt("Escribe el título de la encuesta: ");
    const encuesta = new Encuesta(titulo);

    let numPreguntas = parseInt(prompt("¿Cuántas preguntas quieres agregar?(mínimo 8):"));

    while (isNaN(numPreguntas) || numPreguntas < 8){
        numPreguntas = parseInt(prompt("Número inválido. Igrese al menos 8 preguntas:"));
    }

    //Bucle para pedir cada pregunta
    for (let i = 0; i < numPreguntas; i++){
        let texto = "";
        while (!texto || texto.trim() === ""){
            texto = prompt(`Escribe el texto de la pregunta ${i+1}:`);
            if (!texto || texto.trim() === ""){
                alert("Debes ingresar un texto válido para la pregunta.");
            }
        }

        let opciones = [];
        while (opciones.length < 2){
            const entrada = prompt("Escribe al menos 2 opciones separadas por comas:");
            if (!entrada) {
                alert("No Ingresaste nada. Intenta de nuevo.");
                continue;
            }
            opciones = entrada
            .split(",")
            .map(op => op.trim())
            .filter(op => op!== "");

            if (opciones.length < 2){
                alert("Debes ingresar al menos 2 opciones");
            }
        }
        encuesta.agregarPregunta(new Pregunta(texto, opciones));
    }
    encuesta.realizarEncuesta();
    encuesta.mostrarResultados();
}
iniciarEncuesta();