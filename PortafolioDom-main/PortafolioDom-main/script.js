import { PortafolioService, Proyecto, SuperProyecto } from "./portafolioService.js";

const formulario = document.getElementById('formProyecto');
formulario.addEventListener('submit', createProyecto);

const servicio = new PortafolioService();

function refresh(){
    const container = document.getElementById('projects__container');
    container.innerHTML = '';

    const projects = servicio.getProyectos();

    const get = (obj, ...names) => {
        for (const n of names) {
            if (obj && obj[n] !== undefined && obj[n] !== null) return obj[n];
        }
        return undefined;
    }

    projects.forEach(e => {
        const proyectoElemento = document.createElement('div');
        proyectoElemento.className = 'project-card';

        // Nombre / título
        const titleProject = document.createElement('h3');
        titleProject.innerText = get(e, 'nombre', 'name') || 'Sin título';
        proyectoElemento.appendChild(titleProject);

        // Descripción
        const descText = get(e, 'descripcion', 'description') || '';
        if (descText) {
            const desc = document.createElement('p');
            desc.className = 'project-description';
            desc.innerText = descText;
            proyectoElemento.appendChild(desc);
        }

        // Tecnologías (puede venir como 'tecnologias', 'tecnologies', 'tecs')
        const tecs = get(e, 'tecnologias', 'tecnologies', 'tecs') || [];
        if (Array.isArray(tecs) && tecs.length) {
            const tecTitle = document.createElement('h4');
            tecTitle.innerText = 'Tecnologías:';
            proyectoElemento.appendChild(tecTitle);

            const tecList = document.createElement('ul');
            tecs.forEach(t => {
                const li = document.createElement('li');
                li.innerText = (typeof t === 'string') ? t.trim() : String(t);
                tecList.appendChild(li);
            });
            proyectoElemento.appendChild(tecList);
        }

        // Colaboradores (puede venir como 'colaboradores', 'contributors', 'coolaborators')
        const cols = get(e, 'colaboradores', 'contributors', 'coolaborators') || [];
        if (Array.isArray(cols) && cols.length) {
            const colTitle = document.createElement('h4');
            colTitle.innerText = 'Colaboradores:';
            proyectoElemento.appendChild(colTitle);

            const colList = document.createElement('ul');
            cols.forEach(c => {
                const li = document.createElement('li');
                li.innerText = (typeof c === 'string') ? c.trim() : String(c);
                colList.appendChild(li);
            });
            proyectoElemento.appendChild(colList);
        }

        // Repositorio
        const repo = get(e, 'repositorio', 'repository', 'repositoryUrl', 'repository_url') || '';
        if (repo) {
            const repoLink = document.createElement('a');
            repoLink.href = repo;
            repoLink.target = '_blank';
            repoLink.rel = 'noopener noreferrer';
            repoLink.innerText = 'Ver repositorio';
            proyectoElemento.appendChild(repoLink);
        }

        container.appendChild(proyectoElemento);
    });
}

function createProyecto(event)
{
    event.preventDefault();
    console.log(event.target['name'].value);
    //se obtienen los tecnologias y se separa en un array por linea
    var tecs = event.target['tecnologies'].value.split('\n');
    //se obtienen los colaboradores y se separa en un array por linea
    var coolaborators = event.target['contributors'].value.split('\n');
    //creo proyecto extrayendo los valores faltantes directo de Target
    const newProyecto = new Proyecto(
        event.target['name'].value,
        tecs,
        event.target['description'].value,
        coolaborators,
        event.target['repository'].value
    )

    servicio.guardarProyecto(newProyecto);
    

    refresh();

    const formulario = document.getElementById('formProyecto');
    formulario.reset();


    // Separar tecnologias del miltiline por linea
    // const multiline = multilineInput.split('\n');
}