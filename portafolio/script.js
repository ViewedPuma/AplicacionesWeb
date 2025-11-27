const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

//llamado a la API para obtener proyectos por id Itson
async function getPublicProjects(itsonId) {
    const res = await fetch(`${API_BASE}/publicProjects/${itsonId}`);
    if (!res.ok) throw new Error("Error al obtener proyectos");
    return res.json();
}

//Renderizar los proyectos
function renderProjects() {
  const grid = document.getElementById('ProjectsIdItson');
  if (!grid) return;

  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <div class="project-card">
        <div class="project-overlay">
          <h3 class="project-title">No hay proyectos</h3>
          <p>Crea tu primer proyecto.</p>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = projects.map(p => {
    const image = (p.images && p.images[0]) 
      ? p.images[0] 
      : "https://via.placeholder.com/800x600?text=Sin+Imagen";

    return `
      <div class="project-card">
        <img src="${image}" class="project-image" alt="${escapeHtml(p.title || "Proyecto")}">

        <div class="project-overlay">
          <div>
            <h3 class="project-title">${escapeHtml(p.title || '')}</h3>
            <p>${escapeHtml(p.description || '')}</p>

            <ul class="tech-list">
              ${(p.technologies || [])
                .map(t => `<li>${escapeHtml(t)}</li>`)
                .join('')}
            </ul>
          </div>

          <div>
            ${p.repository ? `
              <a class="repo-link" href="${p.repository}" target="_blank">
                Repositorio →
              </a>` : ''
            }
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById('ProjectsIdItson');
    if(!grid) return;

    try{
        grid.innerHTML = "<p>Cargando proyectos...</p>";
        const urlParams = new URLSearchParams(window.location.search);
        const itsonId = urlParams.get('itsonId') || grid.dataset.itsonId;
        if(!itsonId){
            grid.innerHTML = "<p>ID Itson no proporcionado.</p>";
            return;
        }
        projects = await getPublicProjects(itsonId);
        renderProjects();
    } catch (err){
        console.error(err);
        grid.innerHTML = "<p>Error al cargar los proyectos.</p>";
    }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}