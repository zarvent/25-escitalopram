document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const scrollProgressBar = document.querySelector('.scroll-progress');
    const warningModal = document.querySelector('.warning-modal');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    const efficacyChartCanvas = document.getElementById('efficacyChart');
    const citationLinks = document.querySelectorAll('.citation-link');

    // --- Theme Toggle --- 
    function applyTheme(theme) {
        body.dataset.theme = theme;
        localStorage.setItem('escitalopramTheme', theme);
        updateThemeToggleIcons(theme);
        if (efficacyChartCanvas && window.ChartInstance) {
            updateChartTheme(theme, window.ChartInstance);
        }
    }

    function updateThemeToggleIcons(theme) {
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
            moonIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
    });

    const preferredTheme = localStorage.getItem('escitalopramTheme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(preferredTheme);

    // --- Scroll Progress Bar --- 
    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = scrollPercent + '%';
    }
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    // --- Warning Modal --- 
    if (warningModal && !localStorage.getItem('escitalopramWarningAccepted')) {
        warningModal.classList.add('active');
        const acceptBtn = warningModal.querySelector('.warning-accept-btn');
        acceptBtn.addEventListener('click', () => {
            warningModal.classList.remove('active');
            localStorage.setItem('escitalopramWarningAccepted', 'true');
        });
    } else if (warningModal) {
        warningModal.style.display = 'none'; // Hide if already accepted
    }

    // --- Active Navigation Link Highlighting on Scroll --- 
    function onScroll() {
        let currentSectionId = '';
        const headerOffset = document.querySelector('.escitalopram-nav').offsetHeight + 20; // Adjust offset as needed

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial call

    // --- Smooth Scrolling for Nav Links --- 
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.escitalopram-nav').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // --- Citation Tooltip Accessibility --- 
    citationLinks.forEach(link => {
        const tooltip = link.nextElementSibling;
        if (tooltip && tooltip.classList.contains('citation-tooltip')) {
            link.addEventListener('focus', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            link.addEventListener('blur', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        }
    });

    // --- Efficacy Chart (Chart.js) --- 
    function getChartColors(theme) {
        const isDark = theme === 'dark';
        return {
            backgroundColor: isDark ? 'rgba(129, 140, 248, 0.3)' : 'rgba(99, 102, 241, 0.2)', // indigo-400 / indigo-500
            borderColor: isDark ? '#818cf8' : '#6366f1', // indigo-400 / indigo-500
            pointBackgroundColor: isDark ? '#818cf8' : '#6366f1',
            pointBorderColor: isDark ? '#e0e7ff' : '#fff', // indigo-200 / white
            gridColor: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.7)', // slate-700 / slate-200
            ticksColor: isDark ? '#94a3b8' : '#475569', // slate-400 / slate-600
            labelColor: isDark ? '#f1f5f9' : '#1e293b', // slate-100 / slate-800
            highlightBackgroundColor: isDark ? 'rgba(167, 139, 250, 0.4)' : 'rgba(168, 85, 247, 0.3)', // violet-400 / purple-500
            highlightBorderColor: isDark ? '#a78bfa' : '#a855f7', // violet-400 / purple-500
        };
    }

    function createOrUpdateChart() {
        if (!efficacyChartCanvas) return;
        if (window.ChartInstance) {
            window.ChartInstance.destroy(); // Destroy previous instance if exists
        }

        const currentTheme = body.dataset.theme;
        const colors = getChartColors(currentTheme);

        const data = {
            labels: ['Citalopram', 'Paroxetina', 'Fluoxetina', 'Sertralina', 'Duloxetina', 'Venlafaxina', 'Escitalopram'],
            datasets: [{
                label: 'Eficacia vs. Tolerabilidad',
                data: [
                    { x: 78, y: 75, r: 10 }, // Citalopram (Tolerabilidad, Eficacia)
                    { x: 80, y: 78, r: 10 }, // Paroxetina
                    { x: 82, y: 80, r: 10 }, // Fluoxetina
                    { x: 85, y: 82, r: 12 }, // Sertralina
                    { x: 77, y: 83, r: 12 }, // Duloxetina
                    { x: 75, y: 88, r: 14 }, // Venlafaxina
                    { x: 88, y: 85, r: 18 }  // Escitalopram (Highlighted)
                ],
                backgroundColor: (context) => context.raw.r === 18 ? colors.highlightBackgroundColor : colors.backgroundColor,
                borderColor: (context) => context.raw.r === 18 ? colors.highlightBorderColor : colors.borderColor,
                pointBackgroundColor: (context) => context.raw.r === 18 ? colors.highlightBorderColor : colors.pointBackgroundColor,
                pointBorderColor: colors.pointBorderColor,
                borderWidth: 2,
                hoverBorderWidth: 3,
                pointRadius: (context) => context.raw.r / 1.5, // Make point radius proportional to bubble size
                pointHoverRadius: (context) => context.raw.r / 1.5 + 2,
            }]
        };

        const options = {
            aspectRatio: 1.5,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tolerabilidad (% de pacientes que continúan el tratamiento)',
                        color: colors.labelColor,
                        font: { size: 12, weight: '500' }
                    },
                    min: 65,
                    max: 95,
                    grid: { color: colors.gridColor, borderColor: colors.gridColor },
                    ticks: { color: colors.ticksColor, font: { size: 10 } }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Eficacia (% de reducción de síntomas / respuesta)',
                        color: colors.labelColor,
                        font: { size: 12, weight: '500' }
                    },
                    min: 65,
                    max: 95,
                    grid: { color: colors.gridColor, borderColor: colors.gridColor },
                    ticks: { color: colors.ticksColor, font: { size: 10 } }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.labels[context.dataIndex] || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.x !== null) {
                                label += `Tolerabilidad: ${context.parsed.x}%`;
                            }
                            if (context.parsed.y !== null) {
                                label += `, Eficacia: ${context.parsed.y}%`;
                            }
                            return label;
                        }
                    },
                    backgroundColor: currentTheme === 'dark' ? '#334155' : '#fff', // slate-700 / white
                    titleColor: currentTheme === 'dark' ? '#f1f5f9' : '#1e293b', // slate-100 / slate-800
                    bodyColor: currentTheme === 'dark' ? '#cbd5e1' : '#334155', // slate-300 / slate-700
                    borderColor: currentTheme === 'dark' ? '#475569' : '#e2e8f0', // slate-600 / slate-200
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        };

        window.ChartInstance = new Chart(efficacyChartCanvas, {
            type: 'bubble',
            data: data,
            options: options
        });
    }

    function updateChartTheme(theme, chartInstance) {
        if (!chartInstance) return;
        const colors = getChartColors(theme);

        chartInstance.options.scales.x.title.color = colors.labelColor;
        chartInstance.options.scales.x.grid.color = colors.gridColor;
        chartInstance.options.scales.x.grid.borderColor = colors.gridColor;
        chartInstance.options.scales.x.ticks.color = colors.ticksColor;

        chartInstance.options.scales.y.title.color = colors.labelColor;
        chartInstance.options.scales.y.grid.color = colors.gridColor;
        chartInstance.options.scales.y.grid.borderColor = colors.gridColor;
        chartInstance.options.scales.y.ticks.color = colors.ticksColor;

        chartInstance.data.datasets.forEach(dataset => {
            dataset.backgroundColor = (context) => context.raw.r === 18 ? colors.highlightBackgroundColor : colors.backgroundColor;
            dataset.borderColor = (context) => context.raw.r === 18 ? colors.highlightBorderColor : colors.borderColor;
            dataset.pointBackgroundColor = (context) => context.raw.r === 18 ? colors.highlightBorderColor : colors.pointBackgroundColor;
            dataset.pointBorderColor = colors.pointBorderColor;
        });

        chartInstance.options.plugins.tooltip.backgroundColor = theme === 'dark' ? '#334155' : '#fff';
        chartInstance.options.plugins.tooltip.titleColor = theme === 'dark' ? '#f1f5f9' : '#1e293b';
        chartInstance.options.plugins.tooltip.bodyColor = theme === 'dark' ? '#cbd5e1' : '#334155';
        chartInstance.options.plugins.tooltip.borderColor = theme === 'dark' ? '#475569' : '#e2e8f0';

        chartInstance.update();
    }

    // Initial chart creation
    if (typeof Chart !== 'undefined') {
        createOrUpdateChart();
    } else {
        // Fallback or wait for Chart.js to load if it's deferred and not ready
        const chartJsScript = document.querySelector('script[src*="chart.min.js"]');
        if (chartJsScript) {
            chartJsScript.addEventListener('load', createOrUpdateChart);
        } else {
            console.warn('Chart.js not found. Interactive chart will not be rendered.');
        }
    }
});
