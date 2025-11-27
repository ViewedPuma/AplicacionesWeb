const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

let projects = [];
let editingProjectId = null;

// Inicio
window.onload = () => {
  init();
};

async function init() {
  try {
    await fetchProjects();
    renderProjects();
  } catch (err) {
    console.error(err);
    renderError("No se pudieron cargar los proyectos.");
  }
}

// Obtener proyectos del usuario autenticado
async function fetchProjects() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    projects = [];
    return;
  }
  const res = await fetch(`${API_BASE}/projects`, {
    headers: { "auth-token": token }
  });
  if (!res.ok) throw new Error("Error al obtener proyectos");
  projects = await res.json();
}

// Renderizado
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  if (!projects || projects.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No hay proyectos</h3>
        <p>Crea tu primer proyecto.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = projects.map(p => `
     <div class="project-card">
      <h3>${escapeHtml(p.title || '')}</h3>
      <p>${escapeHtml(p.description || '')}</p>
      <p><strong>Tecnologías:</strong> ${(p.technologies || []).join(', ')}</p>
      ${p.repository ? `<p><a href="${p.repository}" target="_blank" rel="noopener">Repositorio</a></p>` : ''}
      ${(p.images && p.images[0]) 
        ? `<img src="${p.images[0]}" alt="preview" class="preview-img" style="max-width:100%;border-radius:8px;margin-top:8px;">` 
        : '<p style="font-size:12px;color:#888;">Sin imagen</p>'}
      <div class="project-actions">
        <button class="btn-edit" onclick="handleEdit('${p._id}')">Editar</button>
        <button class="btn-delete" onclick="handleDelete('${p._id}')">Eliminar</button>
      </div>
    </div>
  `).join('');
}

function renderError(msg) {
  const grid = document.getElementById('projectsGrid');
  if (grid) grid.innerHTML = `<div class="error-state"><p>${escapeHtml(msg)}</p></div>`;
}

// Modal
function openModal(isEdit = false) {
  document.getElementById('modal').classList.add('active');
  document.getElementById('modalTitle').textContent = isEdit ? 'Editar Proyecto' : 'Agregar Proyecto';
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('projectForm').reset();
  editingProjectId = null;
}

// Guardar (crear / actualizar)
async function saveProject(e) {
  e.preventDefault();
  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("No autenticado");
    return;
  }

  const title = document.getElementById('projectName').value.trim();
  const description = document.getElementById('projectDescription').value.trim();
  const technologiesRaw = document.getElementById('projectTechnologies').value.trim();
  const repository = document.getElementById('projectRepository').value.trim();
  const imageUrl = document.getElementById('projectImageUrl').value.trim();

  if (!title) {
    alert("Título requerido");
    return;
  }

  const technologies = technologiesRaw
    ? technologiesRaw.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  const payload = {
    title,
    description,
    technologies,
    repository: repository || undefined,
        images: imageUrl ? [imageUrl] : []
  };

  try {
    let res;
    if (editingProjectId) {
      res = await updateProject(editingProjectId, payload);
    } else {
      res = await createProject(payload);
    }
    if (!res || res.error) {
      alert("Error al guardar");
      return;
    }
    await fetchProjects();
    renderProjects();
    closeModal();
  } catch (err) {
    console.error(err);
    alert("Error al procesar");
  }
}

// Preparar edicion
function handleEdit(id) {
  const p = projects.find(x => x._id === id);
  if (!p) return;
  editingProjectId = id;
  document.getElementById('projectName').value = p.title || '';
  document.getElementById('projectDescription').value = p.description || '';
  document.getElementById('projectTechnologies').value = (p.technologies || []).join(', ');
  document.getElementById('projectRepository').value = p.repository || '';
  document.getElementById('projectImageUrl').value = (p.images && p.images[0]) ? p.images[0] : '';
  openModal(true);
}

// Eliminar
async function handleDelete(id) {
  if (!confirm("¿Eliminar este proyecto?")) return;
  try {
    await deleteProject(id);
    projects = projects.filter(p => p._id !== id);
    renderProjects();
  } catch (err) {
    console.error(err);
    alert("Error al eliminar");
  }
}

// evitar XSS
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

// metodos para llamar a la API
async function getProjectsByUser() {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE}/projects`, {
        headers: { "auth-token": token },
    });

    if (!res.ok) throw new Error("No se pudieron obtener proyectos");
    return res.json();
}

async function createProject(project) {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify(project),
    });

    if (!res.ok) throw new Error("Error al crear proyecto");
    return res.json();
}

async function updateProject(id, updates) {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error("Error al actualizar proyecto");
    return res.json();
}

async function deleteProject(id) {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: { "auth-token": token },
    });

    if (!res.ok) throw new Error("Error al eliminar proyecto");
    return res.json();
}

const imageInput = document.getElementById('projectImageUrl');
if (imageInput) {
  imageInput.addEventListener('input', () => {
    const url = imageInput.value.trim();
    const prev = document.getElementById('imagePreview');
    if (!prev) return;
    if (!url) {
      prev.innerHTML = '';
      return;
    }
    prev.innerHTML = `<img src="${url}" onerror="this.src='';" style="max-width:100%;border:1px solid #ddd;border-radius:4px;">`;
  });
}


//se me olvido que se tenia que cerrar la sesion xd
function logout() {
  localStorage.removeItem('authToken');
  projects = [];
  // Redirige al login
  window.location.href = './index.html';
}