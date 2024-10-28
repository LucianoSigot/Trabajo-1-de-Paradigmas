import promptSync from 'prompt-sync';
const leer = promptSync();

export default function pausa() { 
    this.run = function () {
        leer("Presione la tecla [ENTER] para continuar...");
    };
}