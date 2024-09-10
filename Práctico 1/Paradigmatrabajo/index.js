const prompt = require('prompt-sync')();

ver();

function menu(){
    console.log("Ingrese 1 para realizar una suma");
    console.log("Ingrese 2 para realizar una resta");
    console.log("Ingrese 3 para realizar una multiplicación");
    console.log("Ingrese 4 para realizar una division");
    console.log("Ingrese 5 para salir");
}

function ver(){
    let op=0;
    do{
        console.log("------------------------------------------");
        console.log("Ingresando al menu...");
        console.log("------------------------------------------");
        menu();
        while(true){
            op=parseInt(prompt("Ingrese su opción"));
        if(!isNaN(op)){
            break;
            }else {
                console.log("Error: Ingrese un numero valido");
            }
        }
        
        switch(op){
            case 1:
                console.log("------------------------------------------");
                console.log("Ingresando a suma");
                console.log("------------------------------------------");
                try {
                   suma();
                } catch (error) {
                    console.log("Error en la suma: " + error.message);
                }
                break;
            case 2:
                console.log("------------------------------------------");
                console.log("Ingresando a resta");
                console.log("------------------------------------------");
                try {
                    resta();
                } catch (error) {
                    console.log("Error en la resta: " + error.message);
                }
                break;
            case 3:
                console.log("------------------------------------------");
                console.log("Ingresando a multiplicación");
                console.log("------------------------------------------");
                try {
                    multiplicación();
                } catch (error) {
                    console.log("Error en la multiplicación: " + error.message);
                }
                break;
            case 4:
                console.log("------------------------------------------");
                console.log("Ingresando a division");
                console.log("------------------------------------------");
                try {
                    division();
                } catch (error) {
                    console.log("Error en la division: " + error.message);
                }
                break;
            case 5:
                console.log("Saliendo...");
                break;
            default: 
                console.log("Ingrese una opción correcta");
        }
        
    }while(op!=5);
}

function suma(){
    const numero1 = parseFloat(prompt("Ingrese el primer numero "));
    const numero2 = parseFloat(prompt("Ingrese el segundo numero "));
    if (isNaN(numero1) || isNaN(numero2)) {
        throw new Error("Ingrese números válidos");
    }
    let resultado = numero1 + numero2;
    console.log("La suma resultante es: " + resultado);
}

function resta(){
    const numero1 = parseFloat(prompt("Ingrese el primer numero"));
    const numero2 = parseFloat(prompt("Ingrese el segundo numero"));
    if (isNaN(numero1) || isNaN(numero2)) {
        throw new Error("Ingrese números válidos");
    }
    let resultado = numero1 - numero2;
    console.log("La resta resultante es: " + resultado);
}

function multiplicación(){
    const numero1 = parseFloat(prompt("Ingrese el primer numero"));
    const numero2 = parseFloat(prompt("Ingrese el segundo numero"));
    if (isNaN(numero1) || isNaN(numero2)) {
        throw new Error("Ingrese números válidos");
    }
    let resultado = numero1 * numero2;
    console.log("La multiplicacion resultante es: " + resultado);
}

function division(){
    const numero1 = parseFloat(prompt("Ingrese el primer numero"));
    const numero2 = parseFloat(prompt("Ingrese el segundo numero"));
    if (isNaN(numero1) || isNaN(numero2)) {
        throw new Error("Ingrese números válidos");
    }
    if (numero2 == 0) {
        throw new Error("No se puede dividir entre cero");
    }
    let resultado = numero1 / numero2;
    console.log("La division resultante es: " + resultado); 
} 
