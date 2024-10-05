import promptSync from 'prompt-sync';
import { mostrarDetalles } from './mostrarDetalles.js';
import { editarTarea } from './editarTarea.js';
const prompt = promptSync();

export function mostrarTodasTareas(aTareas) {// Funcion que muestra las tareas
    console.log("Estas son todas tus tareas:");
    for (let i = 0; i < aTareas.length; i++) {
        console.log(`${i + 1}. ${aTareas[i]['titulo']}`);// Muestra las tareas que hay
    }
    console.log("0. Para volver al menú principal");
    let opcion = prompt("Ingrese el número de la tarea que desea ver:");
    if (opcion < 1 || opcion >= aTareas.length + 1) {// Controla que el usuario no se pase con el indice del arreglo
        console.error("Índice de tarea no válido");
        return;
    }
    if (opcion === "0") {// Vuelve al menú
        console.log("Volviendo al menú principal...");
    } else {
        let tarea = aTareas[opcion - 1];// Si no vuelve, muestra las tareas en detalles en esa posición
        if (tarea) {
            mostrarDetalles(tarea);
            let editar = prompt("¿Desea editar esta tarea? (s/n): ");
            if (editar.toLowerCase() !== "s" && editar.toLowerCase() !== "n") {// Controla que ingrese s o n en minuscula
                console.error("Respuesta no válida");
                return;
            }
            if (editar.toLowerCase() === 's') {// Si ingresa s llama a la funcion editarTarea
                editarTarea(tarea);
            }
        } else {
            console.log("Tarea no encontrada");
        }
    }
}

export function mostrarTareasPendientes(aTareas) {// Funcion que muestra las tareas pendientes
    
    let tareasPendientes = []; // Inicializa un arreglo vacío para las tareas pendientes
    
    for (let i = 0; i < aTareas.length; i++) { // Itera sobre todas las tareas
        if (aTareas[i]['estado'].toLowerCase() === "pendiente") { // Comprueba si la tarea está pendiente
            tareasPendientes.push(aTareas[i]); // Agrega la tarea pendiente al arreglo
        }
    }
    
    if (tareasPendientes.length > 0) {
        console.log("Tareas pendientes:");
        for (let i = 0; i < tareasPendientes.length; i++) {// Muestra las tareas pendientes que hay por su título
            console.log(`${i + 1}. ${tareasPendientes[i]['titulo']}`);
        }
        console.log("0 para volver al menú principal");// Vuelve al menú
        let opcion = prompt("Ingrese un número para ver la tarea que desea ver:");
        if (opcion < 1 || opcion >= tareasPendientes.length + 1) {// Controla que el usuario no se pase con el indice del arreglo
            console.error("Índice de tarea no válido");
            return;
        }
        if (opcion === "0") {// Vuelve al menú
            console.log("Volviendo al menú principal...");
        } else {
            let tarea = tareasPendientes[parseInt(opcion) - 1];// Si no vuelve, muestra las tareas en detalles en esa posición
            if (tarea) {
                mostrarDetalles(tarea);
                let editar = prompt("¿Desea editar esta tarea? (s/n): ");
                if (editar.toLowerCase() !== "s" && editar.toLowerCase() !== "n") {// Controla que ingrese s o n en minuscula
                    console.error("Respuesta no válida");
                    return;
                }
                if (editar.toLowerCase() === 's') {// Si ingresa s llama a la funcion editarTarea
                    editarTarea(tarea);
                }
            } else {
                console.log("Tarea no encontrada");// Si no hay tareas en esa posición muestra este cartel
            }
        }
    } else {
        console.log("No hay tareas pendientes");
    }
}

export function mostrarTareasEnCurso(aTareas) {// Funcion que muestra las tareas en curso
    
    let tareasEnCurso = []; // Inicializa un arreglo vacío para las tareas en curso
    
    for (let i = 0; i < aTareas.length; i++) { // Itera sobre todas las tareas
        if (aTareas[i].estado.toLowerCase() === "en curso") { // Comprueba si la tarea está en curso
            tareasEnCurso.push(aTareas[i]); // Agrega la tarea en curso al arreglo
        }
    }
    
    if (tareasEnCurso.length > 0) {
        console.log("Tareas en curso:");
        for (let i = 0; i < tareasEnCurso.length; i++) {// Muestra las tareas en curso que hay por su título
            console.log(`${i + 1}. ${tareasEnCurso[i]['titulo']}`);
        }
        console.log("0 para volver al menú principal");// Vuelve al menú
        let opcion = prompt("Ingrese un número para ver la tarea que desea ver:");
        if (opcion < 1 || opcion >= tareasEnCurso.length + 1) {// Controla que el usuario no se pase con el indice del arreglo
            console.error("Índice de tarea no válido");
            return;
        }
        if (opcion === "0") {// Vuelve al menú
            console.log("Volviendo al menú principal...");
        } else {
            let tarea = tareasEnCurso[parseInt(opcion) - 1];// Si no vuelve, muestra las tareas en detalles en esa posición
            if (tarea) {
                mostrarDetalles(tarea);
                let editar = prompt("¿Desea editar esta tarea? (s/n): ");
                if (editar.toLowerCase() !== "s" && editar.toLowerCase() !== "n") {// Controla que ingrese s o n en minuscula
                    console.error("Respuesta no válida");
                    return;
                }
                if (editar.toLowerCase() === 's') {// Si ingresa s llama a la funcion editarTarea
                    editarTarea(tarea);
                }
            } else {
                console.log("Tarea no encontrada");// Si no hay tarea en la posición muestra este cartel
            }
        }
    } else {
        console.log("No hay tareas en curso");
    }
}

export function mostrarTareasTerminadas(aTareas) {// Funcion que muestra las tareas Terminadas
    let tareasTerminadas = []; // Inicializa un arreglo vacío para las tareas terminadas
    
    for (let i = 0; i < aTareas.length; i++) { // Itera sobre todas las tareas
        if (aTareas[i]['estado'].toLowerCase() === "terminada") { // Comprueba si la tarea está terminada
            tareasTerminadas.push(aTareas[i]); // Agrega la tarea terminada al arreglo
        }
    }
    
    if (tareasTerminadas.length > 0) {
        console.log("Tareas terminadas:");
        for (let i = 0; i < tareasTerminadas.length; i++) {// Muestra las tareas terminadas que hay por su título
            console.log(`${i + 1}. ${tareasTerminadas[i]['titulo']}`);
        }
        console.log("0 para volver al menú principal");
        let opcion = prompt("Ingrese un número para ver la tarea que desea ver:");
        if (opcion < 1 || opcion >= tareasTerminadas.length + 1) {// Controla que el usuario no se pase del indice
            console.error("Índice de tarea no válido");
            return;
        }
        if (opcion === "0") {// Vuelve al menú
            console.log("Volviendo al menú principal...");
        } else {
            let tarea = tareasTerminadas[parseInt(opcion) - 1];// Si no vuelve al menú muestra la tarea detallada en esa posición
            if (tarea) {
                mostrarDetalles(tarea);
                let editar = prompt("¿Desea editar esta tarea? (s/n): ");
                if (editar.toLowerCase() !== "s" && editar.toLowerCase() !== "n") {// Controla que ingrese s o n en minuscula
                    console.error("Respuesta no válida");
                    return;
                }
                if (editar.toLowerCase() === 's') {// Si ingresa s llama a la función editarTarea
                    editarTarea(tarea);
                }
            } else {
                console.log("Tarea no encontrada");// Si no hay ninguna tarea en esa posición muestra este cartel
            }
        }
    } else {
        console.log("No hay tareas terminadas");
    }
}
