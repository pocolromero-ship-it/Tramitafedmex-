/**
 * TramitaFedmx - Lógica Interactiva y Cotizador
 * Gestoría Oficial Especializada en Autotransporte Federal SICT
 */

// Teléfono oficial de WhatsApp de Jair Quintana
const WHATSAPP_NUMBER = "525540519678";

// Datos del Calendario Físico-Mecánica según la NOM / SCT
const CALENDARIO_DATA = {
  "5-6": {
    digitos: "5 ó 6",
    periodoAnual: "Enero, Febrero, Marzo y Abril",
    mesesDetalle: "1er Cuatrimestre",
    semestre1: "Enero - Junio",
    semestre2: "Julio - Diciembre",
    color: "from-amber-500 to-amber-700",
    badge: "Ene - Abr",
    consejo: "Recomendado iniciar trámite con 20 días de anticipación para evitar multas de la Guardia Nacional."
  },
  "7-8": {
    digitos: "7 u 8",
    periodoAnual: "Marzo, Abril, Mayo y Junio",
    mesesDetalle: "2do Bimestre extendido",
    semestre1: "Enero - Junio",
    semestre2: "Julio - Diciembre",
    color: "from-blue-500 to-blue-700",
    badge: "Mar - Jun",
    consejo: "Verifica que tus llantas, frenos y luces cumplan con la NOM-068-SCT antes de la inspección."
  },
  "3-4": {
    digitos: "3 ó 4",
    periodoAnual: "Mayo, Junio, Julio y Agosto",
    mesesDetalle: "Período intermedio de verano",
    semestre1: "Enero - Junio",
    semestre2: "Julio - Diciembre",
    color: "from-emerald-500 to-emerald-700",
    badge: "May - Ago",
    consejo: "Alta demanda en unidades de carga refrigerada y tolvas durante estos meses."
  },
  "1-2": {
    digitos: "1 ó 2",
    periodoAnual: "Julio, Agosto, Septiembre y Octubre",
    mesesDetalle: "3er Cuatrimestre",
    semestre1: "Enero - Junio",
    semestre2: "Julio - Diciembre",
    color: "from-purple-500 to-purple-700",
    badge: "Jul - Oct",
    consejo: "Asegúrate de contar con tu póliza de seguro vigente y tarjeta de circulación original."
  },
  "9-0": {
    digitos: "9 ó 0",
    periodoAnual: "Septiembre, Octubre, Noviembre y Diciembre",
    mesesDetalle: "Cierre de año",
    semestre1: "Enero - Junio",
    semestre2: "Julio - Diciembre",
    color: "from-rose-500 to-rose-700",
    badge: "Sep - Dic",
    consejo: "Cierre de año fiscal ante SICT; te recomendamos tramitar tu cita desde septiembre."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCalendar();
  initForm();
  initFaq();
  initMobileMenu();
  initModal();
});

/* ==========================================================================
   Gestión de Tema (Claro / Oscuro)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleIcon = document.getElementById("theme-toggle-icon");
  const themeToggleText = document.getElementById("theme-toggle-text");

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
    updateThemeUI(true);
  } else {
    document.documentElement.classList.remove("dark");
    updateThemeUI(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.documentElement.classList.add("transition-theme");
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateThemeUI(isDark);

      setTimeout(() => {
        document.documentElement.classList.remove("transition-theme");
      }, 300);
    });
  }

  function updateThemeUI(isDark) {
    if (!themeToggleIcon) return;
    if (isDark) {
      themeToggleIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      `;
      if (themeToggleText) themeToggleText.textContent = "Modo Claro";
    } else {
      themeToggleIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      `;
      if (themeToggleText) themeToggleText.textContent = "Modo Oscuro";
    }
  }
}

/* ==========================================================================
   Calculadora Interactiva de Calendario Físico-Mecánica
   ========================================================================== */
function initCalendar() {
  const digitButtons = document.querySelectorAll(".digit-btn");
  const resultCard = document.getElementById("calendar-result");
  const resultDigitos = document.getElementById("res-digitos");
  const resultPeriodoAnual = document.getElementById("res-periodo-anual");
  const resultSemestre1 = document.getElementById("res-semestre-1");
  const resultSemestre2 = document.getElementById("res-semestre-2");
  const resultConsejo = document.getElementById("res-consejo");
  const resultWaBtn = document.getElementById("res-wa-btn");

  digitButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      digitButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.getAttribute("data-key");
      const data = CALENDARIO_DATA[key];
      if (!data) return;

      if (resultDigitos) resultDigitos.textContent = data.digitos;
      if (resultPeriodoAnual) resultPeriodoAnual.textContent = data.periodoAnual;
      if (resultSemestre1) resultSemestre1.textContent = data.semestre1;
      if (resultSemestre2) resultSemestre2.textContent = data.semestre2;
      if (resultConsejo) resultConsejo.textContent = data.consejo;

      if (resultWaBtn) {
        const msg = encodeURIComponent(
          `Hola Jair, vi en tu sitio web que mi terminación de placa es (${data.digitos}) y me corresponde verificar en ${data.periodoAnual}. Quiero agendar mi inspección físico-mecánica o cotizar el trámite.`
        );
        resultWaBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
      }

      if (resultCard) {
        resultCard.classList.add("scale-[0.99]");
        setTimeout(() => resultCard.classList.remove("scale-[0.99]"), 150);
      }
    });
  });
}

/* ==========================================================================
   Formulario de Cotización Asistida (Envío directo a WhatsApp)
   ========================================================================== */
function initForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("form-nombre")?.value.trim() || "No especificado";
    const telefono = document.getElementById("form-tel")?.value.trim() || "No especificado";
    const tipoTramite = document.getElementById("form-tramite")?.value || "General";
    const tipoUnidad = document.getElementById("form-unidad")?.value || "No especificada";
    const detalles = document.getElementById("form-detalles")?.value.trim() || "Sin detalles adicionales";

    const mensaje = `🚛 *SOLICITUD DE COTIZACIÓN - TRAMITAFEDMX*
👤 *Nombre:* ${nombre}
📱 *Teléfono:* ${telefono}
📋 *Trámite solicitado:* ${tipoTramite}
🚚 *Tipo de unidad:* ${tipoUnidad}
📝 *Detalles de la empresa/unidad:* ${detalles}

_Solicito asesoría para mi trámite ante la SICT/SCT._`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(waUrl, "_blank");
  });
}

// Cotizar un servicio específico desde las tarjetas
window.cotizarServicio = function (nombreServicio) {
  const tramiteSelect = document.getElementById("form-tramite");
  if (tramiteSelect) {
    for (let i = 0; i < tramiteSelect.options.length; i++) {
      if (tramiteSelect.options[i].text.toLowerCase().includes(nombreServicio.toLowerCase())) {
        tramiteSelect.selectedIndex = i;
        break;
      }
    }
  }

  const formSection = document.getElementById("tramite-asistido");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth" });
  }
};

/* ==========================================================================
   Acordeón de Preguntas Frecuentes (FAQ)
   ========================================================================== */
function initFaq() {
  const faqButtons = document.querySelectorAll(".faq-toggle");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isOpen = content.classList.contains("open");

      document.querySelectorAll(".faq-content").forEach((c) => c.classList.remove("open"));
      document.querySelectorAll(".faq-icon").forEach((i) => (i.style.transform = "rotate(0deg)"));

      if (!isOpen) {
        content.classList.add("open");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

/* ==========================================================================
   Menú Móvil
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

/* ==========================================================================
   Modal para Ampliar Imagen de Publicidad Impresa
   ========================================================================== */
function initModal() {
  const modal = document.getElementById("ad-modal");
  const openModalBtns = document.querySelectorAll(".open-ad-modal");
  const closeModalBtns = document.querySelectorAll(".close-ad-modal");

  if (!modal) return;

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    });
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
  });
}
