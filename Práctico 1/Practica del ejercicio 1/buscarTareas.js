import prompt from 'prompt-sync';
import pausa from './Pause.js';
import mostrarDetalles from './mostrarDetalles.js';
import { edicion } from './editarTareas.js';

const pause = new pausa();
const leer = prompt();

export default function buscarTarea(tareas) {
    let palabraClave = leer("Ingrese una palabra o conjunto de palabras para buscar en los títulos de las tareas: ");
    let resultados = [];

    // Recorro el arreglo
    for (let i = 0; i < tareas.length; i++) {
        let titulo = tareas[i].titulo;
        let coincidenciaEncontrada = false;

        // Comprueba si el título contiene la palabra clave
        for (let j = 0; j <= titulo.length - palabraClave.length; j++) {
            let coincide = true;

            // Compara carácter por carácter
            for (let k = 0; k < palabraClave.length; k++) {
                if (titulo[j + k] !== palabraClave[k]) {
                    coincide = false;
                    break; // Sale si hay una diferencia
                }
            }

            if (coincide) {
                resultados.push(tareas[i]);
                coincidenciaEncontrada = true; // Marca que se encontró una coincidencia
                break; // Sale del bucle si se encontró una coincidencia
            }
        }
    }

    // Mostrar resultados
    console.clear();
    
    if (resultados.length > 0) {
        console.log("Tareas encontradas:");
        for (let i = 0; i < resultados.length; i++) {
            console.log(`${i + 1}. ${resultados[i].titulo}`);
        }

        let ver = leer("¿Desea ver alguna tarea? s/n: ").toUpperCase();
        while (ver !== "S" && ver !== "N") {
            ver = leer("Ingrese S o N: ").toUpperCase();
        }

        if (ver === "S") {
            let indice = leer("Ingrese el número de la tarea: ");
            indice = parseInt(indice) - 1;

            // Verificación del índice ingresado
            if (isNaN(indice) || indice < 0 || indice >= resultados.length) {
                console.error("Número de tarea inválido. Ingrese un número correcto.");
                return;
            } else {
                mostrarDetalles(resultados[indice]);
                let elegir = leer("Ingrese E para editar o 0 para volver: ").toUpperCase();
                        if (elegir === "E") {
                            console.log("Ingresando al menú de editar tareas...");
                            console.log(`Estas editando la tarea :${resultados[indice]["titulo"]} `);
                            edicion(resultados[indice]);//lo mando al menú de edición de tarea
                        }else{
                            if(elegir!="E" && elegir!="0"){
                                console.error("Tiene que ingresar E o 0: ");
                                pause.run();
                                return;
                            }
                        }
            }
        }
    } else {
        console.log("No se encontraron tareas que coincidan con la búsqueda.");
    }
}

