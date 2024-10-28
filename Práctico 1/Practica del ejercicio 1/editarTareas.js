import prompt from 'prompt-sync';
import arregloTarea from './index.js';
import pausa from './Pause.js';
const leer = prompt();
const pause=new pausa;
export function edicion(tarea) {
    let opciones;
    do {
        console.log("\n-Si deseas mantener los valores de un atributo, déjalo en blanco.");
        console.log("-Si deseas dejar un atributo en blanco, escribe un espacio.");
        console.log("[1] Título (El titulo no se pude dejar en blanco) ");
        console.log("[2] Descripción");
        console.log("[3] Estado ([P]endiente, [E]n curso, [T]erminada, [C]ancelada).");
        console.log("[4] Dificultad ([1] Fácil, [2] Media, [3] Difícil).");
        console.log("[5] Vencimiento");
        console.log("[0] Volver al menú");
        
        opciones = leer("¿Qué desea editar?: ");
        
        switch (opciones) {
            case "1": // Editar título
                let nuevoTitulo = leer("Ingrese el nuevo título: ");
                while(nuevoTitulo.length>100){
                    nuevoTitulo=leer("El titulo no puede tener mas de 100 caracteres: ");
                }
                if (nuevoTitulo.trim() === "") {
                    // Mantener el valor anterior
                } else {
                    tarea["titulo"] = nuevoTitulo;
                }
                break;

            case "2": // Editar descripción
                let nuevaDescripcion = leer("Ingrese la nueva descripción: ");
                while(nuevaDescripcion.length>500){
                    nuevoDescripcion=leer("La descripción no puede tener mas de 500 caracteres: ");
                }
                if (nuevaDescripcion === "") {
                    // No se hace nada, la cadena permanece sin modificar
                } else if (nuevaDescripcion.trim() === "") {
                    // Si solo se ingresó un espacio, se establece la descripción como vacía
                    console.log("dejando el atributo en blanco");
                    tarea["descripcion"] = "----"; // Borra la descripción
                } else {
                    tarea["descripcion"] = nuevaDescripcion; // Actualiza la descripción
                }
                break;

            case "3": // Editar estado
                let estado;
                do {
                    console.log("[P]endiente, [E]n curso, [T]erminada, [C]ancelada.");
                    console.log("No se puede borrar el valor del atributo estado")
                    estado = leer("Ingrese una opción para el estado: ").toUpperCase();
                    if (estado===""){
                        console.log("Se mantiene como antes el estado.");
                        estado=tarea["estado"];
                    }
                    switch (estado) {
                        case "P":
                            tarea["estado"] = "Pendiente";
                            break;
                        case "E":
                            tarea["estado"] = "En curso";
                            break;
                        case "T":
                            tarea["estado"] = "Terminada";
                            break;
                        case "C":
                            tarea["estado"] = "Cancelada";
                            console.log("La tarea ha sido cancelada.");
                            return "Eliminar"; // Indicamos que se debe eliminar la tarea
                        default:
                            console.error("Ingrese una opción válida.");
                    }
                } while (estado !== "P" && estado !== "E" && estado !== "T" && estado !== "C" && estado!="");
                break;

            case "4": // Editar dificultad
                let dificultad;
                do {
                    console.log("[1] Fácil, [2] Media, [3] Difícil.");
                    console.log("No se puede borrar el valor del atributo dificultad")
                    dificultad = leer("Ingrese una opción para la dificultad: ");
                    if (dificultad === "1") {
                        tarea["dificultad"] = "⭐";
                    } else if (dificultad === "2") {
                        tarea["dificultad"] = "⭐⭐";
                    } else if (dificultad === "3") {
                        tarea["dificultad"] = "⭐⭐⭐";
                    } else if (dificultad === "") {
                        break; // Mantener el valor original
                    } else {
                        console.error("Ingrese una opción válida.");
                    }
                } while (dificultad !== "1" && dificultad !== "2" && dificultad !== "3");
                break;

            case "5": // Editar vencimiento
                    console.log("Si quiere dejar el atributo en blanco entonces ingrese un espacio.");
                    let nuevoVencimiento=leer("Si quiere modificar el atributo vencimiento ingrese cualquier otra cosa: ");
                    if(nuevoVencimiento===""){
                        break;
                    }
                    if(nuevoVencimiento.trim() !==""){
                    nuevoVencimiento = obtenerFechaVencimiento();
                        }
                        if(nuevoVencimiento!="-------"){
                            tarea["fechaVencimiento"] = nuevoVencimiento;
                        }
                        else if (nuevoVencimiento.trim() === "") { // Si se ingresa un espacio
                            console.log("dejando el atributo en blanco...");
                            tarea["fechaVencimiento"] = "--------"; // Establecer a un valor que indique vacío
                        }
                break; 
            case "0":
                console.log("Volviendo...");
                break;

            default:
                console.error("Ingrese un número válido.");
        }

        // Actualizar la fecha de última edición
        tarea["fechaUltimaEdicion"] = new Date().toISOString();
        
        console.log("La tarea se ha guardado.");
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