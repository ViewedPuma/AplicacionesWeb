 let projects = [];
        let editingIndex = -1;

        // Cargar proyectos al iniciar
        window.onload = function() {
            loadProjects();
            renderProjects();
        };

        function loadProjects() {
            const saved = localStorage.getItem('projects');
            if (saved) {
                projects = JSON.parse(saved);
            } else {
                // Proyectos de ejemplo
                projects = [
                    {
                        name: "Sistema de Gestión",
                        description: "Sistema completo para gestionar inventarios y ventas de una empresa."
                    },
                    {
                        name: "App Móvil de Tareas",
                        description: "Aplicación para organizar y seguir el progreso de tareas diarias."
                    },
                    {
                        name: "Dashboard Analytics",
                        description: "Panel de control para visualizar métricas y estadísticas en tiempo real."
                    }
                ];
                saveToStorage();
            }
        }

        function saveToStorage() {
            localStorage.setItem('projects', JSON.stringify(projects));
        }

        function renderProjects() {
            const grid = document.getElementById('projectsGrid');
            
            if (projects.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state">
                        <h3>No hay proyectos</h3>
                        <p>Agrega tu primer proyecto para comenzar</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = projects.map((project, index) => `
                <div class="project-card">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-actions">
                        <button class="btn-edit" onclick="editProject(${index})">Editar</button>
                        <button class="btn-delete" onclick="deleteProject(${index})">Eliminar</button>
                    </div>
                </div>
            `).join('');
        }

        function openModal(isEdit = false) {
            document.getElementById('modal').classList.add('active');
            document.getElementById('modalTitle').textContent = isEdit ? 'Editar Proyecto' : 'Agregar Proyecto';
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.getElementById('projectForm').reset();
            editingIndex = -1;
        }

        function saveProject(event) {
            event.preventDefault();
            
            const name = document.getElementById('projectName').value;
            const description = document.getElementById('projectDescription').value;
            
            if (editingIndex >= 0) {
                // Actualizar proyecto existente
                projects[editingIndex] = { name, description };
            } else {
                // Agregar nuevo proyecto
                projects.push({ name, description });
            }
            
            saveToStorage();
            renderProjects();
            closeModal();
        }

        function editProject(index) {
            editingIndex = index;
            const project = projects[index];
            
            document.getElementById('projectName').value = project.name;
            document.getElementById('projectDescription').value = project.description;
            
            openModal(true);
        }

        function deleteProject(index) {
            if (confirm('¿Estás seguro de eliminar este proyecto?')) {
                projects.splice(index, 1);
                saveToStorage();
                renderProjects();
            }
        }