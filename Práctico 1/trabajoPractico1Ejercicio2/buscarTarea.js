import promptSync from 'prompt-sync';
import { mostrarDetalles } from './mostrarDetalles.js';

const prompt = promptSync();

// Función para mostrar un mensaje de error personalizado
function mostrarError(mensaje) {
  console.error(`Error: ${mensaje}`);
}

// Función para validar la entrada del usuario
function validarEntrada(entrada) {
  if (entrada.trim() === '') {
    return false;
  }
  return true;
}

export function buscarTarea(aTareas) {
  
    // Pide al usuario que ingrese el título o parte del mismo para buscar la tarea
    let busqueda = prompt("Ingrese el título o parte del mismo para buscar la tarea:");
    if (!validarEntrada(busqueda)) {
      mostrarError('Debe ingresar un título o parte del mismo para buscar la tarea.');
      return;
    }

    // Crear un arreglo para los resultados
    let resultados = [];
    const busquedaLower = busqueda.toLowerCase();
    const longitudBusqueda = busquedaLower.length;
  
    // Usar un bucle for para iterar sobre las tareas
    for (let i = 0; i < aTareas.length; i++) {
        const titulo = aTareas[i]['titulo'].toLowerCase();
        
        // Verificar si el título comienza con la búsqueda (sin distinción entre mayúsculas y minúsculas)
        if (titulo.length >= longitudBusqueda) {
            let encontrado = true;

            for (let j = 0; j < longitudBusqueda; j++) {
                if (titulo[j] !== busquedaLower[j]) {
                    encontrado = false;
                    break;
                }
            }

            if (encontrado) {
                // Agregar tarea al arreglo de resultados
                resultados.push(aTareas[i]);
            }
        }
    }

    if (resultados.length > 0) {
        // Muestra los resultados de la búsqueda
        console.log(`**Resultados de búsqueda para "${busqueda}":**`);
        for (let i = 0; i < resultados.length; i++) {
            console.log(`${i + 1}. ${resultados[i]['titulo']}`);
        }
        console.log("0 para volver al menú");

        // Pide al usuario que ingrese el número de la tarea que desea ver
        let opcion = prompt("Ingrese el número de la tarea que desea ver:");
        if (opcion === "0") {
            // Vuelve al menú principal
            console.log("Volviendo al menú principal...");
        } else {
            // Verifica si el índice ingresado por el usuario es válido
            if (opcion < 1 || opcion > resultados.length) {
                mostrarError('Índice inválido. Debe ingresar un número entre 1 y ' + resultados.length);
                return;
            }

            // Muestra la tarea en la posición seleccionada
            let tarea = resultados[parseInt(opcion) - 1];
            if (tarea) {
                mostrarDetalles(tarea);
            } else {
                mostrarError("Tarea no encontrada");
            }
        }
    } else {
        mostrarError('No se encontraron tareas que coincidan con la búsqueda.');
    }
}
    } else {
      // Muestra un mensaje indicando que no se encontraron tareas que coincidan con la búsqueda
      console.log(`No se encontraron tareas que coincidan con "${busqueda}".`);
    }

}
