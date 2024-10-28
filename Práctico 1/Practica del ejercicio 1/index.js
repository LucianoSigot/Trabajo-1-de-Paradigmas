// index.js
import prompt from 'prompt-sync';
import pausa from './Pause.js';
import verMenu from './Menu.js';
import { addTask } from './agregarTareas.js';  
import { mostrarTodasTareas } from './todasTareas.js';
import { menuBuscarTareas } from './Menu.js';
import buscarTarea from './buscarTareas.js';

const pause = new pausa();
const leer = prompt();
let arregloTarea = [];  

export default arregloTarea;

function darNombre() {
    let nombre;
    nombre = leer("Ingrese su nombre: ");
    do {
        if (!nombre.trim()) {
            console.error("Ingrese un nombre distinto de vacío: ");
            nombre = leer(" ");
        }
    } while (!nombre.trim()); // Controla que no ingrese espacios vacíos
    return nombre;
}

function main() {
    let nombre = darNombre();
    let opciones;
    console.log(`¡Bienvenido ${nombre} a su sistema de lista de tareas!!!`);
    pause.run();
    console.clear();

    do {
        verMenu();
        opciones = leer("Ingrese una opción: ");
        switch (opciones) {
            case "1": // Mostrar Todas las tareas
                mostrarTodasTareas(arregloTarea);
                break;
            case "2": // Buscar Tareas
                if (arregloTarea.length > 0) { // Comprobar si hay tareas en el arreglo
                    let op;
                    do {
                        menuBuscarTareas(); // Mostrar el menú de búsqueda
                        op = leer("Seleccione una opción: "); 
                        switch (op) {
                            case "1":
                                buscarTarea(arregloTarea);
                                break;
                            case "0":
                                console.log("Volviendo al menú");
                                break;
                            default:
                                console.error("Ingrese una de las opciones");
                        }
                        pause.run();
                        console.clear();
                    } while (op !== "0");
                } else {
                    console.error("No hay tareas cargadas");
                }
                break;
            case "3": // Agregar Tareas
                addTask(arregloTarea); 
                break;
            case "0":
                console.log("¡Nos vemos!!!");
                break;
            default:
                console.error("Ingrese una opción correcta");
        }
        pause.run();
        console.clear();
    } while (opciones !== "0");
}

main();
