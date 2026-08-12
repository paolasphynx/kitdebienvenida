const completedViews = new Set();

function toggleGroup(groupId) {
  const group = document.getElementById(groupId);
  if (group) {
    group.classList.toggle('open');
  }
}

function showSubtopic(viewId, menuElement) {
  // Ocultar todas las vistas
  document.querySelectorAll('.subtopic-view').forEach(view => {
    view.classList.remove('active');
  });

  // Desactivar marcas en el menú
  document.querySelectorAll('.stepper-item, .subtopic-item').forEach(item => {
    item.classList.remove('active');
  });

  // Mostrar la vista seleccionada
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Marcar ítem de menú correspondiente
  if (menuElement) {
    menuElement.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function markAndGo(currentViewId, nextViewId, nextMenuId, parentGroupIdToOpen) {
  completedViews.add(currentViewId);
  
  // Calcular total de subtemas existentes para el porcentaje dinámico
  const totalSubtopics = document.querySelectorAll('.subtopic-view').length;
  const percent = Math.min(Math.round((completedViews.size / totalSubtopics) * 100), 100);
  
  const percentElem = document.getElementById('progress-percent');
  const barElem = document.getElementById('progress-bar');
  
  if (percentElem) percentElem.innerText = percent + '%';
  if (barElem) barElem.style.width = percent + '%';

  // Desplegar menú correspondiente
  if (parentGroupIdToOpen) {
    const group = document.getElementById(parentGroupIdToOpen);
    if (group && !group.classList.contains('open')) {
      group.classList.add('open');
    }
  }

  const nextMenuElem = document.getElementById(nextMenuId);
  showSubtopic(nextViewId, nextMenuElem);
}

/* Modal de Infografía */
function openInfographicModal() {
  const modal = document.getElementById('infographicModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeInfographicModal() {
  const modal = document.getElementById('infographicModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function closeInfographicModalOnOuterClick(event) {
  if (event.target.id === 'infographicModal') {
    closeInfographicModal();
  }
}