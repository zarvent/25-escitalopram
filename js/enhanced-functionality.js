// Theme Management
class ThemeManager {
    constructor() {
        this.initTheme();
        this.bindEvents();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button state
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    bindEvents() {
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Citation System
class CitationSystem {
    constructor() {
        this.citations = new Map();
        this.initCitations();
        this.createTooltips();
    }

    initCitations() {
        // Define all citations with their full references
        this.citations.set(1, {
            authors: "Cipriani, A., Furukawa, T. A., Salanti, G., et al.",
            year: "2018",
            title: "Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder: a systematic review and network meta-analysis",
            journal: "The Lancet",
            volume: "391(10128)",
            pages: "1357-1366",
            doi: "10.1016/S0140-6736(17)32802-7"
        });

        this.citations.set(2, {
            authors: "Moncrieff, J., Cooper, R. E., Stockmann, T., et al.",
            year: "2022",
            title: "The serotonin theory of depression: a systematic umbrella review of the evidence",
            journal: "Molecular Psychiatry",
            volume: "28(8)",
            pages: "3243-3256",
            doi: "10.1038/s41380-022-01661-0"
        });

        this.citations.set(3, {
            authors: "Hieronymus, F., Nilsson, S., & Eriksson, E.",
            year: "2016",
            title: "A mega-analysis of fixed-dose trials reveals dose-dependency and a rapid onset of action for the antidepressant effect of three selective serotonin reuptake inhibitors",
            journal: "Translational Psychiatry",
            volume: "6(6)",
            pages: "e834",
            doi: "10.1038/tp.2016.104"
        });

        this.citations.set(4, {
            authors: "Santarsieri, D., & Schwartz, T. L.",
            year: "2015",
            title: "Antidepressant efficacy and side-effect burden: a quick guide for clinicians",
            journal: "Drugs in Context",
            volume: "4",
            pages: "212290",
            doi: "10.7573/dic.212290"
        });

        this.citations.set(5, {
            authors: "Jakubovski, E., Varigonda, A. L., Freemantle, N., et al.",
            year: "2016",
            title: "Systematic review and meta-analysis: dose-response relationship of selective serotonin reuptake inhibitors in major depressive disorder",
            journal: "American Journal of Psychiatry",
            volume: "173(2)",
            pages: "174-183",
            doi: "10.1176/appi.ajp.2015.15030331"
        });
    }

    createTooltips() {
        // Create tooltip container
        const tooltip = document.createElement('div');
        tooltip.className = 'citation-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: #1f2937;
            color: white;
            padding: 12px;
            border-radius: 8px;
            font-size: 12px;
            max-width: 300px;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
            line-height: 1.4;
        `;
        document.body.appendChild(tooltip);

        // Bind events to citation links
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('citation-link')) {
                this.showTooltip(e, tooltip);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('citation-link')) {
                this.hideTooltip(tooltip);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (e.target.classList.contains('citation-link')) {
                this.updateTooltipPosition(e, tooltip);
            }
        });
    }

    showTooltip(event, tooltip) {
        const citationId = parseInt(event.target.textContent.replace(/[\[\]]/g, ''));
        const citation = this.citations.get(citationId);
        
        if (citation) {
            const formattedCitation = this.formatCitation(citation);
            tooltip.innerHTML = formattedCitation;
            tooltip.style.opacity = '1';
            this.updateTooltipPosition(event, tooltip);
        }
    }

    hideTooltip(tooltip) {
        tooltip.style.opacity = '0';
    }

    updateTooltipPosition(event, tooltip) {
        const x = event.clientX;
        const y = event.clientY;
        
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y - tooltip.offsetHeight - 10}px`;
    }

    formatCitation(citation) {
        return `
            <strong>${citation.authors}</strong> (${citation.year}). 
            <em>${citation.title}</em>. 
            ${citation.journal}, <em>${citation.volume}</em>, ${citation.pages}.
            <br><small>DOI: ${citation.doi}</small>
        `;
    }

    generateBibliography() {
        const bibliography = document.getElementById('bibliography-list');
        if (!bibliography) return;

        bibliography.innerHTML = '';
        
        for (const [id, citation] of this.citations) {
            const entry = document.createElement('div');
            entry.className = 'bibliography-entry mb-4 p-4 bg-slate-50 rounded-lg border-l-4 border-indigo-200';
            entry.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <span class="font-mono text-sm text-indigo-600 mr-3">[${id}]</span>
                        <span class="text-slate-700">
                            ${this.formatCitation(citation)}
                        </span>
                    </div>
                    <button 
                        class="copy-citation-btn ml-3 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs hover:bg-indigo-200 transition-colors"
                        data-citation-id="${id}"
                        aria-label="Copiar cita">
                        📋 Copiar
                    </button>
                </div>
            `;
            bibliography.appendChild(entry);
        }

        // Bind copy events
        bibliography.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-citation-btn')) {
                this.copyCitation(e.target.dataset.citationId);
            }
        });
    }

    copyCitation(citationId) {
        const citation = this.citations.get(parseInt(citationId));
        if (!citation) return;

        const formattedText = `${citation.authors} (${citation.year}). ${citation.title}. ${citation.journal}, ${citation.volume}, ${citation.pages}. DOI: ${citation.doi}`;
        
        navigator.clipboard.writeText(formattedText).then(() => {
            // Show success feedback
            const btn = document.querySelector(`[data-citation-id="${citationId}"]`);
            const originalText = btn.textContent;
            btn.textContent = '✓ Copiado';
            btn.style.background = '#10b981';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        });
    }
}

// Legal Notice Modal
class LegalNoticeModal {
    constructor() {
        this.hasShown = localStorage.getItem('legalNoticeShown') === 'true';
        if (!this.hasShown) {
            this.showModal();
        }
    }

    showModal() {
        const modal = document.createElement('div');
        modal.className = 'legal-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(4px);
        `;

        modal.innerHTML = `
            <div class="modal-content bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">⚠️</span>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">Aviso Legal Importante</h3>
                </div>
                <div class="text-sm text-slate-600 mb-6 leading-relaxed">
                    <p class="mb-3">
                        <strong>Este contenido es únicamente informativo y educativo.</strong>
                    </p>
                    <p class="mb-3">
                        No constituye consejo médico profesional, diagnóstico o tratamiento. 
                        Siempre consulte con un profesional de la salud calificado antes de 
                        tomar cualquier decisión relacionada con medicamentos o tratamientos.
                    </p>
                    <p class="text-xs text-slate-500">
                        Al continuar, usted acepta haber leído y comprendido esta advertencia.
                    </p>
                </div>
                <button 
                    id="accept-legal-notice" 
                    class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Acepto y Continúo
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle acceptance
        document.getElementById('accept-legal-notice').addEventListener('click', () => {
            localStorage.setItem('legalNoticeShown', 'true');
            document.body.removeChild(modal);
        });
    }
}

// Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.init();
    }

    init() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        });
    }
}

// Smooth Scrolling with Offset for Fixed Header
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerHeight = 80; // Adjust based on header height
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Chart Enhancement
class ChartEnhancer {
    constructor() {
        this.initChart();
    }

    initChart() {
        // Wait for Chart.js to load
        if (typeof Chart === 'undefined') {
            setTimeout(() => this.initChart(), 100);
            return;
        }

        const ctx = document.getElementById('efectividadChart');
        if (!ctx) return;

        const chart = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Efectividad vs Tolerabilidad',
                    data: [
                        { x: 0.59, y: 0.64, r: 15, medication: 'Escitalopram' },
                        { x: 0.56, y: 0.63, r: 12, medication: 'Sertralina' },
                        { x: 0.54, y: 0.61, r: 11, medication: 'Fluoxetina' },
                        { x: 0.51, y: 0.58, r: 10, medication: 'Paroxetina' },
                        { x: 0.48, y: 0.55, r: 9, medication: 'Citalopram' }
                    ],
                    backgroundColor: function(context) {
                        const medication = context.parsed._custom || context.raw.medication;
                        return medication === 'Escitalopram' ? 
                            'rgba(99, 102, 241, 0.8)' : 'rgba(148, 163, 184, 0.6)';
                    },
                    borderColor: function(context) {
                        const medication = context.parsed._custom || context.raw.medication;
                        return medication === 'Escitalopram' ? 
                            'rgba(99, 102, 241, 1)' : 'rgba(148, 163, 184, 0.8)';
                    },
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.95)',
                        titleColor: '#f1f5f9',
                        bodyColor: '#e2e8f0',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            title: function(context) {
                                return context[0].raw.medication;
                            },
                            label: function(context) {
                                return [
                                    `Efectividad: ${(context.raw.x * 100).toFixed(1)}%`,
                                    `Tolerabilidad: ${(context.raw.y * 100).toFixed(1)}%`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Efectividad (Diferencia de medias estandarizada)',
                            color: '#64748b',
                            font: { size: 12, weight: '500' }
                        },
                        grid: { color: 'rgba(148, 163, 184, 0.2)' },
                        ticks: { color: '#64748b' }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Tolerabilidad (1 - Tasa de abandono)',
                            color: '#64748b',
                            font: { size: 12, weight: '500' }
                        },
                        grid: { color: 'rgba(148, 163, 184, 0.2)' },
                        ticks: { color: '#64748b' }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'point'
                },
                onHover: (event, activeElements) => {
                    event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
                },
                onClick: (event, activeElements) => {
                    if (activeElements.length > 0) {
                        const element = activeElements[0];
                        const medication = chart.data.datasets[0].data[element.index].medication;
                        this.showMedicationDetails(medication);
                    }
                }
            }
        });

        // Store chart reference for potential updates
        window.efectividadChart = chart;
    }

    showMedicationDetails(medication) {
        const detailsContainer = document.getElementById('medication-details');
        if (!detailsContainer) return;

        const details = {
            'Escitalopram': {
                efectividad: '59%',
                tolerabilidad: '64%',
                descripcion: 'ISRS más selectivo con excelente perfil de efectividad y tolerabilidad.',
                ventajas: ['Menos interacciones medicamentosas', 'Menor riesgo de efectos cardiovasculares', 'Buen perfil en ancianos'],
                dosisTypica: '10-20mg diarios'
            },
            'Sertralina': {
                efectividad: '56%',
                tolerabilidad: '63%',
                descripcion: 'ISRS bien establecido con amplia evidencia clínica.',
                ventajas: ['Amplia experiencia clínica', 'Seguro en embarazo', 'Múltiples indicaciones'],
                dosisTypica: '50-200mg diarios'
            }
            // Add more medications as needed
        };

        const detail = details[medication];
        if (!detail) return;

        detailsContainer.innerHTML = `
            <div class="mt-6 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                <h4 class="text-lg font-semibold text-indigo-900 mb-3">${medication}</h4>
                <p class="text-sm text-indigo-700 mb-4">${detail.descripcion}</p>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p><strong>Efectividad:</strong> ${detail.efectividad}</p>
                        <p><strong>Tolerabilidad:</strong> ${detail.tolerabilidad}</p>
                        <p><strong>Dosis típica:</strong> ${detail.dosisTypica}</p>
                    </div>
                    <div>
                        <p class="font-medium text-indigo-800 mb-2">Ventajas clave:</p>
                        <ul class="list-disc list-inside text-indigo-700 space-y-1">
                            ${detail.ventajas.map(v => `<li>${v}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

// Lazy Loading for Chart
class LazyChartLoader {
    constructor() {
        this.init();
    }

    init() {
        const chartContainer = document.querySelector('.chart-container');
        if (!chartContainer) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadChart();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(chartContainer);
    }

    loadChart() {
        // Load Chart.js if not already loaded
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => new ChartEnhancer();
            document.head.appendChild(script);
        } else {
            new ChartEnhancer();
        }
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new CitationSystem();
    new LegalNoticeModal();
    new ScrollProgress();
    new SmoothScroller();
    new LazyChartLoader();
    
    // Initialize animations on scroll
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animateOnScrollElements.forEach(el => observer.observe(el));
});
