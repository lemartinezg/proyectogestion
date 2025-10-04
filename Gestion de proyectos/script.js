// script.js
document.addEventListener('DOMContentLoaded', () => {

  /*MENÚ MÓVIL Y SCROLL SUAVE*/
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cerrar menú al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Desplazamiento suave con compensación del header fijo
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Animación opcional de barras de progreso (no afecta al resto del diseño)
  document.querySelectorAll('.progress-fill').forEach(el => {
    const w = el.style.width || '0%';
    el.style.width = '0%';
    setTimeout(() => el.style.width = w, 200);
  });


  /*SIMULADOR EMOCIONAL*/
  if (document.getElementById("expense-form")) {

    // --- Datos base ---
    const emotions = [
      { value: "felicidad", label: "Felicidad", color: "hsl(140, 60%, 60%)" },
      { value: "ansiedad", label: "Ansiedad", color: "hsl(25, 70%, 55%)" },
      { value: "culpa", label: "Culpa", color: "hsl(15, 70%, 50%)" },
      { value: "satisfaccion", label: "Satisfacción", color: "hsl(160, 50%, 55%)" },
      { value: "miedo", label: "Miedo", color: "hsl(10, 70%, 45%)" },
    ];

    const categories = [
      "Alimentación",
      "Transporte",
      "Entretenimiento",
      "Ropa",
      "Salud",
      "Educación",
      "Hogar",
      "Tecnología",
      "Viajes",
      "Otros",
    ];

    let expenses = [];

    // --- Elementos del DOM ---
    const emotionSelect = document.getElementById("emotion");
    const categorySelect = document.getElementById("category");
    const expenseList = document.getElementById("expense-list");
    const totalAmountEl = document.getElementById("total-amount");
    const avgIntensityEl = document.getElementById("avg-intensity");
    const intensityInput = document.getElementById("intensity");
    const intensityValue = document.getElementById("intensity-value");

    // --- Cargar opciones dinámicamente ---
    if (categorySelect && emotionSelect) {
      categories.forEach(cat => {
        const option = document.createElement("option");
        option.textContent = cat;
        option.value = cat;
        categorySelect.appendChild(option);
      });

      emotions.forEach(emo => {
        const option = document.createElement("option");
        option.textContent = emo.label;
        option.value = emo.value;
        emotionSelect.appendChild(option);
      });
    }

    // --- Mostrar valor actual del rango ---
    if (intensityInput && intensityValue) {
      intensityInput.addEventListener("input", () => {
        intensityValue.textContent = `${intensityInput.value}/10`;
      });
    }

    // --- Actualizar estadísticas y gráficos ---
    function updateStats() {
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      const avg = expenses.length ? expenses.reduce((sum, e) => sum + e.intensity, 0) / expenses.length : 0;

      if (totalAmountEl) totalAmountEl.textContent = `$${total.toFixed(2)}`;
      if (avgIntensityEl) avgIntensityEl.textContent = `${avg.toFixed(1)}/10`;

      updateCharts();
    }

    // --- Gráficos con Chart.js ---
    let emotionChart, categoryChart, scatterChart;

    function updateCharts() {
      const emotionData = emotions.map(emo => ({
        label: emo.label,
        data: expenses.filter(e => e.emotion === emo.value).length,
        backgroundColor: emo.color
      })).filter(e => e.data > 0);

      const categoryData = categories.map(cat => ({
        label: cat,
        data: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
      })).filter(e => e.data > 0);

      const scatterData = expenses.map(e => ({ x: e.amount, y: e.intensity }));

      if (emotionChart) emotionChart.destroy();
      if (categoryChart) categoryChart.destroy();
      if (scatterChart) scatterChart.destroy();

      const emoCanvas = document.getElementById("emotionChart");
      const catCanvas = document.getElementById("categoryChart");
      const scatterCanvas = document.getElementById("scatterChart");

      if (emoCanvas) {
        emotionChart = new Chart(emoCanvas, {
          type: "pie",
          data: {
            labels: emotionData.map(e => e.label),
            datasets: [{
              data: emotionData.map(e => e.data),
              backgroundColor: emotionData.map(e => e.backgroundColor)
            }]
          },
        });
      }

      if (catCanvas) {
        categoryChart = new Chart(catCanvas, {
          type: "bar",
          data: {
            labels: categoryData.map(e => e.label),
            datasets: [{
              label: "Monto",
              data: categoryData.map(e => e.data),
              backgroundColor: "hsl(85, 60%, 60%)"
            }]
          },
        });
      }

      if (scatterCanvas) {
        scatterChart = new Chart(scatterCanvas, {
          type: "scatter",
          data: {
            datasets: [{
              label: "Monto vs Intensidad",
              data: scatterData,
              backgroundColor: "hsl(220, 60%, 60%)",
            }],
          },
          options: {
            scales: {
              x: { title: { text: "Monto", display: true } },
              y: { title: { text: "Intensidad", display: true }, min: 0, max: 10 }
            }
          },
        });
      }
    }

    // --- Manejo del formulario ---
    const form = document.getElementById("expense-form");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const category = categorySelect.value;
        const emotion = emotionSelect.value;
        const intensity = parseInt(intensityInput.value);
        const description = document.getElementById("description").value;

        const expense = { id: Date.now(), amount, category, emotion, intensity, description };
        expenses.push(expense);

        const li = document.createElement("li");
        li.className = "flex justify-between items-center border-b border-gray-200 py-2";
        const emo = emotions.find(em => em.value === emotion);

        li.innerHTML = `
          <div>
            <p class="font-medium">$${amount} - ${category}</p>
            <p class="text-sm text-gray-500">${description || ""}</p>
          </div>
          <span class="text-sm font-semibold" style="color:${emo.color}">${emo.label}</span>
        `;

        expenseList.prepend(li);
        updateStats();
        e.target.reset();
        intensityValue.textContent = "5/10";
      });
    }

    updateStats();
  }
});
