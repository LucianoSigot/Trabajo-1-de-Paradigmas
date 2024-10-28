import prompt from 'prompt-sync';
import { menuAddTareas } from './Menu.js';
import pausa from './Pause.js';

const pause = new pausa();
const leer = prompt();

export function addTask(tareas) {
    let titulo = "";
    let descripcion = "------";
    let dificultad = "";
    let fechaV = "------";
    let estado="";

    let opciones;
    do {
        menuAddTareas();
        opciones = leer("Ingrese un número para poder ingresar unos de los campos específicos: ");
        switch (opciones) {
            case "1":
                titulo = leer("Ingrese un título: ");
                do {
                    if (!titulo.trim()) {
                        console.error("No puede ingresar un título vacío.");
                        titulo = leer("Ingrese un título no vacío: ");
                    } else {
                        if (titulo.length > 100) {
                            console.error("No puede ingresar más de 100 caracteres.");
                            titulo = leer("Ingrese un título correcto: ");
                        }
                    }
                } while (!titulo.trim() || titulo.length > 100);
                break;
            case "2":
                descripcion = leer("Ingrese una descripción: ");
                while (descripcion.length > 500) {
                    console.error("La descripción no puede tener más de 500 caracteres: ");
                    descripcion = leer("");
                }
                break;
            case "3":
                do {
                    console.log("[1] Fácil, [2] Media, [3] Difícil o vacío si la quiere dejar por default.");
                    dificultad = leer("Ingrese una de las siguientes opciones para la dificultad: ");
                    if (dificultad==="") {
                        console.log("Poniendo la dificultad por default (Fácil): ");
                        dificultad = "⭐";
                        break;
                    }
                    switch (dificultad) {
                        case "1":
                            dificultad = "⭐";
                            break;
                        case "2":
                            dificultad = "⭐⭐";
                            break;
                        case "3":
                            dificultad = "⭐⭐⭐";
                            break;
                        default:
                            console.error("Ingrese una de las opciones");
                    }
                } while (dificultad !== "⭐" && dificultad !== "⭐⭐" && dificultad !== "⭐⭐⭐");
                    console.log("Se agregó la dificultad correctamente");
                break;
            case "4":
                do {
                    console.log("[P]endiente, [E]n curso, [T]erminada");
                    console.log("Presione enter si quiere el estado en default")
                    estado = leer("Ingrese una opción para el estado: ").toUpperCase();
                    if (estado===""){
                        console.log("Poniendo el estado en Pendiente...");
                        estado="Pendiente";
                        break;
                    }
                    switch (estado) {
                        case "P":
                            estado = "Pendiente";
                            break;
                        case "E":
                            estado = "En curso";
                            break;
                        case "T":
                            estado = "Terminada";
                            break;
                        default:
                            console.error("Ingrese una opción válida.");
                    }
                } while (estado!=="P" && estado!== "E" && estado !=="T");
                console.log("Se cambio el estado");
                break;
            case "5":
                fechaV = obtenerFechaVencimiento();
                console.log(`Fecha de vencimiento: ${fechaV}`);
                break;
            case "6":
                if(titulo===""){
                    console.error("Tiene que ingresar el titulo antes de agregar una nueva tarea");
                    break;
                }
                else{
                    if(dificultad===""){
                        console.log("Se agrego por default la dificultad.");
                        dificultad="⭐";
                    }
                    if(estado===""){
                        console.log("Se agrego por default el estado.");
                        estado="Pendiente";
                    }

                    let fechaCreacion = new Date();
                    let fechaUltimaEdicion = "";
                    let tarea = {
                        titulo: titulo,
                        descripcion: descripcion,
                        estado: estado,
                        fechaCreacion: fechaCreacion,
                        fechaUltimaEdicion: fechaUltimaEdicion,
                        dificultad: dificultad,
                        fechaVencimiento: fechaV
                        };
                    tareas.push(tarea); // Agrega la tarea al arreglo
                    console.log("Tarea agregada con éxito:", tarea);
                    return; // Opción para salir del menú de agregar tarea
                }
                break;
            case "0":
                console.log("Volviendo al menú principal...");
                return;
                break;
            default:
                console.error("Ingrese uno de los campos específicos: ");
        }
        pause.run();
        console.clear();
    } while (opciones !== "0");

}

function obtenerFechaVencimiento() {
    let fechaVencimiento = "-------";
    let dia, mes, ano;
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    do {
        ano = leer("Ingrese el año de vencimiento o presione Enter para cancelar: ");
        if (ano === "") {
            return fechaVencimiento;
        }
        if (ano.length !== 4 || isNaN(ano)) {
            console.error("Ingrese un año válido con cuatro dígitos.");
        }
    } while (ano.length !== 4 || isNaN(ano));

    const esBisiesto = (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0));
    if (esBisiesto) {
        diasPorMes[1] = 29;
    }

    do {
        mes = leer("Ingrese el mes de vencimiento (01-12) o presione Enter para cancelar: ");
        if (mes === "") {
            return fechaVencimiento;
        }
        if (mes < 1 || mes > 12 || isNaN(mes)) {
            console.error("Mes inválido. Ingrese un número entre 01 y 12.");
        }
    } while (mes < 1 || mes > 12 || isNaN(mes));

    do {
        dia = leer(`Ingrese el día de vencimiento (01-${diasPorMes[mes - 1]}): `);
        if (dia === "") {
            return fechaVencimiento;
        }
        if (dia < 1 || dia > diasPorMes[mes - 1] || isNaN(dia)) {
            console.error(`Día inválido. Ingrese un número entre 01 y ${diasPorMes[mes - 1]}.`);
        }
    } while (dia < 1 || dia > diasPorMes[mes - 1] || isNaN(dia));

    fechaVencimiento = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`;
    return fechaVencimiento;
}
