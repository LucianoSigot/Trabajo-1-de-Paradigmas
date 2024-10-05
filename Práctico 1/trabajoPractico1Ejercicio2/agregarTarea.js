import promptSync from 'prompt-sync';
const prompt = promptSync();

export function agregarTarea(aTareas) {//Funcion que agrega tareas mediante una pila y arreglo
    let titulo;
    do {
      titulo = prompt("Ingrese el título de la tarea:");
      if (!titulo || titulo.trim() === "") {// Control que ingrese algo en el título que sea diferente a vacio 
        console.error("Título no válido");
      }
    } while (!titulo || titulo.trim() === "");//Repite hasta que sea diferente de vacio
  
    let descripcion;
    do {
      descripcion = prompt("Ingrese la descripción de la tarea:");
      if (!descripcion || descripcion.trim() === "") {// Control que ingrese algo en la descripción que sea diferente a vacio 
        console.error("Descripción no válida");
      }
    } while (!descripcion || descripcion.trim() === "");//Repite hasta que sea diferente de vacio
  
    let vencimiento;
    do {
        vencimiento = prompt("Ingrese la fecha de vencimiento de la tarea (Formato AAAA-MM-DD):");
        if (!vencimiento || vencimiento.trim() === "") {//Controlo que no este vacia
          console.error("Fecha de vencimiento no válida");
        } else if (!validaDato(vencimiento)) {
          console.error("Fecha de vencimiento no válida, debe ser en formato AAAA-MM-DD");
        } else if (!verificaDia(vencimiento)) {
          console.error("Fecha de vencimiento debe ser mayor o igual a la fecha actual");
        }
      } while (!vencimiento || vencimiento.trim() === "" || !validaDato(vencimiento) || !verificaDia(vencimiento));//Repite hasta que se cumpla todas las condiciones
  
    let dificultad;
    do {
      dificultad = parseInt(prompt('Ingrese la dificultad de la tarea (1: Fácil, 2: Medio, 3: Difícil):'));
      if (isNaN(dificultad) || dificultad < 1 || dificultad > 3) {
        console.error("Dificultad no válida, debe ser un número entre 1 y 3");
      }
    } while (isNaN(dificultad) || dificultad < 1 || dificultad > 3);//Repito mientras dificultad sea distinto de 1,2,3
  
    let tarea = {//Le doy los valores a mi arreglo tarea
      titulo: titulo,
      descripcion: descripcion,
      vencimiento: vencimiento,
      dificultad: dificultad,
      estado: 'Pendiente',
      fechaCreacion: new Date(),
      fechaUltimaEdicion: null
    };
  
    aTareas.push(tarea);//Creo una pila en la primera instancia, y luego voy agregando arreglos a esta
    console.log("Tarea agregada correctamente");
  }
  
  function validaDato(cadena) {//verifica que la cadena sea de tipo AAAA-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(cadena);
  }
  function verificaDia(cadena){//Verifica si el tiempo de vencimiento sea mayor al tiempo de creacion
    const hoy = new Date();
  const vencimientoDato = new Date(cadena);
  return vencimientoDato >= hoy;
  }