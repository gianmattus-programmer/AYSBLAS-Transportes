window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
    showNavOnScroll()
    showButtonWhatsappOnScroll()
}

function showNavOnScroll() {
    if(scrollY > 0) {
        document.querySelector("#navigation").classList.add("scroll")
    } else {
        document.querySelector("#navigation").classList.remove("scroll")
    }
}

function showButtonWhatsappOnScroll() {
    if(scrollY > 200) {
        document.querySelector("#buttonWhatsapp").classList.add("show")
    } else {
        document.querySelector("#buttonWhatsapp").classList.remove("show")
    }
}

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}

// Función para verificar la visibilidad de las secciones
function checkServicesSectionsVisibility() {
  const servicesSection = document.getElementById('services');
  const servicesDeskSection = document.getElementById('servicesDesktop');
  
  console.log('=== DIAGNÓSTICO DE SECCIONES DE SERVICIOS ===');
  
  if (servicesSection) {
    const servicesDisplay = window.getComputedStyle(servicesSection).display;
    console.log('Sección móvil (#services):', 
                'Existe:', !!servicesSection, 
                'Estilo display:', servicesDisplay,
                'Visible:', servicesDisplay !== 'none');
  } else {
    console.error('¡Sección #services no encontrada!');
  }
  
  if (servicesDeskSection) {
    const deskDisplay = window.getComputedStyle(servicesDeskSection).display;
    console.log('Sección escritorio (#servicesDesktop):', 
                'Existe:', !!servicesDeskSection, 
                'Estilo display:', deskDisplay,
                'Visible:', deskDisplay !== 'none');
  } else {
    console.error('¡Sección #servicesDesktop no encontrada!');
  }
  
  console.log('Ancho de ventana actual:', window.innerWidth);
  console.log('Debería mostrar:', window.innerWidth < 1080 ? '#services' : '#servicesDesktop');
  console.log('=== FIN DE DIAGNÓSTICO ===');
}

// Función para asegurar la visibilidad de la imagen principal
function checkMainImageVisibility() {
  const mainImage = document.getElementById('interactive-image');
  if (mainImage) {
    // Asegurar que la imagen tenga display block y sea visible
    mainImage.style.display = 'block';
    mainImage.style.opacity = '1';
    
    // Asegurar que la imagen dentro del contenedor también sea visible
    const imageElement = mainImage.querySelector('img');
    if (imageElement) {
      imageElement.style.display = 'block';
      imageElement.style.width = '100%';
      imageElement.style.height = '100%';
      imageElement.style.objectFit = 'cover';
    }
    
    console.log('Visibilidad de imagen principal ajustada');
  }
}

// Manejador unificado para todos los eventos DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado - iniciando configuración de enlaces');
  
  // Verificar y ajustar visibilidad de la imagen principal
  checkMainImageVisibility();
  
  // Ejecutar diagnóstico inicial
  checkServicesSectionsVisibility();
  
  // Verificar después de un tiempo para permitir que los estilos se apliquen
  setTimeout(checkServicesSectionsVisibility, 500);
  
  // Configuración específica para el botón principal de servicios
  const mainServiceButton = document.getElementById('main-service-button');
  if (mainServiceButton) {
    console.log('Configurando botón principal de servicios');
    
    // Eliminar atributos onclick existentes
    mainServiceButton.removeAttribute('onclick');
    
    // Añadir event listener directamente
    mainServiceButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Clic en botón principal de servicios');
      
      // Usar el mismo breakpoint que en CSS: 1080px
      const targetId = window.innerWidth < 1080 ? 'services' : 'servicesDesktop';
      console.log('Redirigiendo a:', targetId, 'Ancho de pantalla:', window.innerWidth);
      
      // Verificar si la sección existe y es visible
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const isVisible = window.getComputedStyle(targetSection).display !== 'none';
        console.log('Sección target:', targetId, 'Existe:', !!targetSection, 'Visible:', isVisible);
        
        if (!isVisible) {
          console.warn('¡La sección destino no es visible! Intentando hacer visible...');
          targetSection.style.display = 'block';
        }
      }
      
      // Cerrar el menú si está abierto
      closeMenu();
      
      // Navegar a la sección correcta
      setTimeout(function() {
        const element = document.getElementById(targetId);
        if (element) {
          console.log('Elemento encontrado, desplazando a la vista');
          element.scrollIntoView({ behavior: 'smooth' });
          window.location.hash = targetId;
        } else {
          console.error('Sección de servicios no encontrada:', targetId);
        }
      }, 300); // Incrementamos más el retraso
    });
  } else {
    console.error('¡Botón principal de servicios no encontrado!');
  }
  
  // Eliminar todos los onclick existentes en los enlaces de servicios
  document.querySelectorAll('.services-link').forEach(function(link) {
    // Saltar el botón principal que ya configuramos
    if (link.id === 'main-service-button') return;
    
    console.log('Configurando enlace de servicio:', link);
    
    // Eliminar atributos onclick existentes
    link.removeAttribute('onclick');
    
    // Eliminar cualquier evento click existente
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    // Añadir event listener directamente al enlace
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Clic en enlace de servicio');
      
      // Usar el mismo breakpoint que en CSS: 1080px
      const targetId = window.innerWidth < 1080 ? 'services' : 'servicesDesktop';
      console.log('Redirigiendo a:', targetId, 'Ancho de pantalla:', window.innerWidth);
      
      // Cerrar el menú si está abierto
      closeMenu();
      
      // Navegar a la sección correcta
      setTimeout(function() {
        const element = document.getElementById(targetId);
        if (element) {
          console.log('Elemento encontrado, desplazando a la vista');
          element.scrollIntoView({ behavior: 'smooth' });
          window.location.hash = targetId;
        } else {
          console.error('Sección de servicios no encontrada:', targetId);
        }
      }, 200); // Incrementamos el retraso para dar tiempo al DOM
    });
  });
  
  // Actualizar enlaces al cambiar el tamaño de ventana
  window.addEventListener('resize', function() {
    const isMobile = window.innerWidth < 1080;
    const targetId = isMobile ? 'services' : 'servicesDesktop';
    console.log('Ventana redimensionada -', isMobile ? 'móvil' : 'escritorio', 'Ancho:', window.innerWidth);
    
    // Solo actualizar los atributos href para la navegación por URL directa
    document.querySelectorAll('.services-link').forEach(link => {
      link.setAttribute('href', '#' + targetId);
    });
    
    // Verificar secciones después de redimensionar
    setTimeout(checkServicesSectionsVisibility, 500);
    
    // Verificar y ajustar visibilidad de la imagen principal
    checkMainImageVisibility();
  });
});


