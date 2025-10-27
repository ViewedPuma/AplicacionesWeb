//Clousures y prototipos (funciones no objetos)

function alumno(name, ){
    let calificacion = 0;
    

    return{
        name: name,
        estudiar(){
            calificacion +=1;
        },
        getCalificacion(){
            return calificacion;
        }
    }
}

let marquito = alumno("Marco");
marquito.estudiar();
console.log(marquito.getCalificacion());
marquito.estudiar();
marquito.estudiar();
marquito.estudiar();
marquito.estudiar();
marquito.estudiar();
marquito.estudiar();
marquito.estudiar();
marquito.estudiar();
marquito.estudiar();
console.log(marquito.getCalificacion());

class Alumno{
    nombre= "";
    constructor(nombre, carrera){
        this.nombre = nombre;
        this.carrera = carrera;
        this.saldo = 0;

    }

    venderDomplings(){
        return
    }
}

const rafa = new Alumno('Rafa', 'ISW');


//Herencia

class SuperAlumno extends Alumno{
    favorito = true;
    amigoDelLegend = true;

}

const cava = new SuperAlumno('Cava', 'ISW');
console.log(cava);

const sergio = {
    nombre: "Sergio",
    carrera: "ISW",
    amigoDelLegend: false,
    amigoDelBeto : true
}


const{nombre, carrera} = sergio;
console.log(sergio.amigoDelLegend);

console.log(nombre, carrera);

const shoco = {
    alias:'shoco',
    superpoder: "SuperResponsiva"
}

const superSergio = {...sergio, ...shoco};
console.log(superSergio);