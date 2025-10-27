//Retornar Cadenas invertidas

//esta es con metodos de Javascript

function retornarCadenainvertida(cadenainvertida) {
    var separarCadena = cadenainvertida.split("");
    var invertirArreglo = separarCadena.reverse();
    var unirArreglo = invertirArreglo.join("");

    return unirArreglo;
}


console.log(retornarCadenainvertida("Hola Mundo"));

//Con los 3 metodos juntos
function retornarCadenainvertida2(cadenainvertida) {
    return cadenainvertida.split("").reverse().join("");
}

console.log(retornarCadenainvertida2("parangaricutirimicuaro"));

function InvertirCadenaBucleDecremento(cadena) {
    var nuevacadena = "";//cadena vacia para guardar la cadena invertida

    for (i = cadena.length - 1; i >= 0; i--) {
        nuevacadena += cadena[i];//Los corchetes [] se usan para acceder a un caracter específico dentro de la cadena (string) usando su indice (su posicion).
    }
    return nuevacadena;
}

console.log(InvertirCadenaBucleDecremento('Kit Kat'));

function RecursionDeInversiondeCadenas(cadena) {
    if (cadena === "") {
        return "";

    } else {
        return RecursionDeInversiondeCadenas(cadena.substr(1)) + cadena.charAt(0);
    }

}

console.log(RecursionDeInversiondeCadenas("jamon"));

//Determinar si un numero es valido

function DeterminarSiUnNumeroEsValido(numero) {
    if (isNaN(numero)) {
        return "No es un numero valido";
    } else {
        return "Es un numero valido";
    }

}

console.log(DeterminarSiUnNumeroEsValido("Hola"));
console.log(DeterminarSiUnNumeroEsValido("5"));
console.log(DeterminarSiUnNumeroEsValido(5));

function operacion(valor1, valor2, operacion) {
    if (isNaN(valor1) || isNaN(valor2)) {
        return "Valor 1 o no no son validos";
    }

    if (operacion === "suma") {
        return valor1 + valor2;
    } else if (operacion === "resta") {
        return valor1 - valor2;
    } else if (operacion === "mult") {
        return valor1 * valor2;
    } else if (operacion === "division") {
        if (valor2 === 0) {
            return "No se puede dividir entre 0"
        } else {
            return valor1 / valor2;
        }

    }
}

console.log(operacion(10, 5, "suma"));
console.log(operacion(10, 5, "resta"));
console.log(operacion(10, 5, "mult"));
console.log(operacion(10, 5, "division"));
console.log(operacion(10, 0, "division"));


function esPar(numpar){
    if(isNaN(numpar)){
        return "No es un numero"
    }
    if(numpar % 2 === 0){
        return "Es par"
    }else{
        return "Impar"
    }
}
console.log(esPar(5)); 
console.log(esPar(2)); 
console.log(esPar("Hola Mundo")); 

function esPrimo(numPrimo){
    var numero = Number(numPrimo);
    if(isNaN(numero) || !Number.isInteger(numero)){
        return "No es un numero valido ni un entero";
    }
    if(numero <= 1) return "No es primo";
    if(numero <= 3) return "Es Primo";
    if(numero % 2 === 0) return "No es primo";

    var limite = Math.floor(Math.sqrt(numero));
    for(i = 3; i <= limite; i+=2){
            if ( numero % i === 0) return "No es primo"
    }
    return "Es Primo";
}

console.log(esPrimo(5));
console.log(esPrimo(10));
console.log(esPrimo("Hola mundo"));


function deEnteroABinario(numBinario){
    var number = numBinario;
    var binario = (number % 2).toString();

    while ( number > 1){
        number = parseInt(number / 2);
        binario = (number %2) + (binario);
    }
    return binario;
}
console.log(deEnteroABinario(10));


console.log(0 == false);
console.log(0 === false);
console.log('' == false);
console.log('' === false);
console.log(null == undefined);
console.log(null === undefined);
console.log('5' == 5);
console.log('5' === 5);

//=== trata de comparar estrictamente los valores es decir tomando el ultimo de ejemplo, si  5 === '5' cuando 
// esta con las comillas simples es un string entonces mas alla de ver los numeros ve el tipo de dato y como no son iguales entonces es false
//caso con el == es que compara valores pero convierte los valores si son diferentes, este no compara el tipo de dato
//== convertiria el 5 a numero y ya despues compararia
