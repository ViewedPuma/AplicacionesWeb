class Proyecto {
    constructor(nombre, id, tecnologias = [], descripcion, colaboradores = [], repositorio) {
        this.nombre = nombre;
        this.id = id;
        this.tecnologias = tecnologias;
        this.descripcion = descripcion;
        this.colaboradores = colaboradores;
        this.repositorio = repositorio;
    }
}

class SuperProyecto extends Proyecto {
    constructor(nombre, id, tecnologias, descripcion, colaboradores, repositorio, fechaImplementacion, linkDespliegue, contactoCliente, esquemas = []) {
        super(nombre, id, tecnologias, descripcion, colaboradores, repositorio);
        this.fechaImplementacion = fechaImplementacion;
        this.linkDespliegue = linkDespliegue;
        this.contactoCliente = contactoCliente;
        this.esquemas = esquemas;
    }
}

class PortafolioService {
    constructor(proyectos = []) {
        this.proyectos = proyectos;
    }
    getProyectos() {
        return this.proyectos;
    }
    guardarProyecto(proyecto) {
        this.proyectos.push(proyecto); // el metodo push es que agrega un elemento
    }
    eliminarProyecto(id) {
        this.proyectos = this.proyectos.filter(proyecto => proyecto.id !== id);// se utiliza un filtro donde si el proyecto es diferente al id que queremos eliminar se queda, de otra manera se elimina
    }
    actualizarProyecto(id, proyecto) {
        const index = this.proyectos.findIndex(p => p.id === id); //find index busca el indicice del proyecto que queremos actualizar
        if (index !== -1) { //si el index es diferente de -1 significa que lo encontro
            this.proyectos[index] = proyecto;
        }
    }
    superActualizarProyecto(id, superProyecto){
        const index = this.proyectos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.proyectos[index] = {
        ...this.proyectos[index], 
        ...superProyecto          
      };
    }
    }
}



//Probar el PortafolioService

const servicio = new PortafolioService();

const proyecto1 = new Proyecto("CamaronTostado", 1, ["HTML", "CSS", "JAVASCRIPT"], "SitioPersonal, esa frase no recuerdo de donde salio", ["Hesed", "Marco", "Sergio"],"https://github.com/Acti/portafolio")

const proyecto2 = new Proyecto("CamaronTostado", 2, ["HTML", "CSS", "JAVASCRIPT"], "SitioPersonal, esa frase no recuerdo de donde salio", ["Hesed", "Marco", "Sergio"],"https://github.com/Acti/portafolio")

servicio.guardarProyecto(proyecto1);

servicio.guardarProyecto(proyecto2);

const ProyectoV1_1 = new Proyecto("Ire a Taco Fish", 1, ["HTML", "CSS", "JAVASCRIPT"], "Sitio Publico, ya toca beca", ["Hesed", "Marco", "Sergio"],"https://github.com/Acti/portafolio")

servicio.actualizarProyecto(1, ProyectoV1_1);


const superData = new SuperProyecto(
  "API Node V2", 1, ["Node.js", "Express", "MongoDB"], "Versión mejorada",
  ["Luis", "Ana"], "https://github.com/luis/api-v2",
  "2025-09-01", "https://api-deploy.com", "cliente@empresa.com", ["diagrama1.png", "flujo2.png"]
);

servicio.superActualizarProyecto(1, superData);

servicio.eliminarProyecto(1);

console.log("Proyectos Finales:", servicio.getProyectos() );
