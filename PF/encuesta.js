function pedirTextoNoVacio(mensaje){
    let texto = "";
    while (!texto || texto.trim() === ""){
        texto = prompt(mensaje);
        if (!texto || texto.trim() === "") {
            alert("Debes ingresar un texto válido.");
        }
    }
    return texto.trim();
}
function pedirOpciones(){
    let opciones = [];
    while (opciones.lenght < 2) {
        const entrada = prompt("Escribe al menos 2 opciones separadas por comas:");
        if (!entrada) {
            alert("No ingresaste nada. Intenta de nuevo.");
            continue;
        }
        opciones = entrada
            .split(",")
            .map(op => op.trim())
            .filter(op => op !== "");
        if (opciones.length < 2) {
            alert("Debes ingresar al menos 2 opciones válidas.")
        }
    }
    return opciones;
}
function crearPregunta(numero) {
    const texto = pedirTextoNoVacio(`Escribe el texto de la pregunta ${numero}:`);
    const opciones = pedirOpciones();
    return {
        texto,
        opciones,
        respuesta: null
    };
}
function crearEncuesta(){
    alert("Bienvenido al creador de encuestas");
    const titulo = pedirTextoNoVacio("Escribe el título de la encuesta:");
    let numPreguntas = parseInt(prompt("¿Cuántas preguntas quieres agregar? (mínimo 8):"));
    while (isNaN(numPreguntas) || numPreguntas < 8) {
        numPreguntas = parseInt(prompt("Número inválido. Ingrese al menos 8 preguntas:"));
    }
    const preguntas = array.from({lenght: numPreguntas}, (_, i) => crearPregunta(i + 1));

    return {titulo, preguntas };
}
function hacerPregunta(pregunta) {
    let mensaje = `\n${pregunta.texto}\n`;
    pregunta.opciones.forEach((op, i) =>{
        mensaje += `${i + 1}. ${op}\n`;
        });
    let eleccion = parseInt(prompt(mensaje + "Selecciona una opción (número):"));
    while (isNaN(eleccion) || eleccion < 1 || eleccion > pregunta.opciones.lenght) {
        eleccion = parseInt(prompt("Opción inválida. Intenta de nuevo:\n" + mensaje));
    }
    return pregunta.opciones[eleccion - 1];
}
function realizarEncuesta(encuesta) {
    alert(`Comenzando la encuesta: ${encuesta.titulo}`);
    encuesta.preguntas = encuesta.preguntas.map(p => ({
        ...p,
        respuesta: hacerPregunta(p)
    }));
    alert("Encuesta completada. Revisa la consola para ver los resultados.");
    return encuesta;
}
function mostrarResultados(encuesta) {
    console.clear();
    console.log(`Resultados de la encuesta: ${encuesta.titulo}\n`);
    encuesta.preguntas.forEach((p, i) => {
        console.log(`${i + 1}. ${p.texto}`);
        console.log(`Respuestas: ${p.respuesta}\n`);
    });
}
function iniciar(){
    const encuesta = crearEncuesta();
    const encuestaRespondida = realizarEncuesta(encuesta);
    mostrarResultados(encuestaRespondida);
}
iniciar();