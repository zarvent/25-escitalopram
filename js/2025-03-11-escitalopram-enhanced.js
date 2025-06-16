/**
 * 2025-03-11 - Escitalopram Article Enhanced Functionality
 * Specific JavaScript for the Escitalopram research article
 * Includes theme toggle, citations, accessibility, and chart enhancements
 */

class EscitalopramArticleEnhancer {
  constructor() {
    this.isInitialized = false;
    this.chartInstance = null;
    this.warningShown = localStorage.getItem('escitalopram-warning-accepted') === 'true';
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    document.addEventListener('DOMContentLoaded', () => {
      this.setupThemeToggle();
      this.setupWarningModal();
      this.setupCitations();
      this.setupBibliography();
      this.setupAccessibility();
      this.setupChartLazyLoading();
      this.setupSmoothScrolling();
      
      this.isInitialized = true;
    });
  }

  // Theme Management
  setupThemeToggle() {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('escitalopram-theme') || 'light';
    this.setTheme(savedTheme);

    // Create theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
      });

      // Keyboard support
      themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          themeToggle.click();
        }
      });
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('escitalopram-theme', theme);
    
    // Update toggle button icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'light' 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v2m6.364.636-1.414 1.414M22 12h-2m-.636 6.364-1.414-1.414M12 22v-2m-6.364-.636 1.414-1.414M2 12h2m.636-6.364 1.414 1.414"/></svg>';
      
      themeToggle.setAttribute('aria-label', 
        theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'
      );
    }
  }

  // Warning Modal
  setupWarningModal() {
    if (this.warningShown) return;

    const modal = document.querySelector('.warning-modal');
    if (modal) {
      // Show modal after a brief delay
      setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }, 500);

      // Handle accept button
      const acceptBtn = modal.querySelector('.warning-accept-btn');
      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          this.closeWarningModal();
        });
      }

      // Handle escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          this.closeWarningModal();
        }
      });
    }
  }

  closeWarningModal() {
    const modal = document.querySelector('.warning-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      localStorage.setItem('escitalopram-warning-accepted', 'true');
      this.warningShown = true;
    }
  }

  // Citation Tooltips
  setupCitations() {
    const citations = document.querySelectorAll('.citation-link');
    
    citations.forEach(citation => {
      // Mouse events
      citation.addEventListener('mouseenter', (e) => {
        this.showCitationTooltip(e.target);
      });

      citation.addEventListener('mouseleave', (e) => {
        this.hideCitationTooltip(e.target);
      });

      // Keyboard events
      citation.addEventListener('focus', (e) => {
        this.showCitationTooltip(e.target);
      });

      citation.addEventListener('blur', (e) => {
        this.hideCitationTooltip(e.target);
      });

      // Click to scroll to bibliography
      citation.addEventListener('click', (e) => {
        e.preventDefault();
        const refId = citation.getAttribute('data-ref');
        const bibEntry = document.querySelector(`[data-bib-id="${refId}"]`);
        if (bibEntry) {
          bibEntry.scrollIntoView({ behavior: 'smooth', block: 'center' });
          bibEntry.style.backgroundColor = 'var(--accent-primary)';
          bibEntry.style.color = 'white';
          setTimeout(() => {
            bibEntry.style.backgroundColor = '';
            bibEntry.style.color = '';
          }, 2000);
        }
      });
    });
  }

  showCitationTooltip(element) {
    const tooltip = element.parentElement.querySelector('.citation-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      tooltip.style.transform = 'translateX(-50%) translateY(-8px)';
    }
  }

  hideCitationTooltip(element) {
    const tooltip = element.parentElement.querySelector('.citation-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
      tooltip.style.transform = 'translateX(-50%) translateY(0)';
    }
  }

  // Bibliography Copy Function
  setupBibliography() {
    const copyButtons = document.querySelectorAll('.copy-citation-btn');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const citationText = button.getAttribute('data-citation');
        
        try {
          await navigator.clipboard.writeText(citationText);
          this.showCopyFeedback(button, '¡Copiado!');
        } catch (err) {
          // Fallback for older browsers
          this.fallbackCopyText(citationText);
          this.showCopyFeedback(button, '¡Copiado!');
        }
      });
    });
  }

  fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
  }

  showCopyFeedback(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    button.style.backgroundColor = '#10b981';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '';
    }, 2000);
  }

  // Accessibility Enhancements
  setupAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Ensure all interactive elements have proper focus management
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex') && element.tagName !== 'A') {
        element.setAttribute('tabindex', '0');
      }
    });

    // Add ARIA labels where missing
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle && !themeToggle.hasAttribute('aria-label')) {
      themeToggle.setAttribute('aria-label', 'Cambiar tema de color');
    }
  }

  // Chart Lazy Loading
  setupChartLazyLoading() {
    const chartContainer = document.querySelector('#efficacyChart');
    if (!chartContainer) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.chartInstance) {
          this.loadChart();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    observer.observe(chartContainer);
  }

  loadChart() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return;
    }

    const ctx = document.getElementById('efficacyChart');
    if (!ctx) return;

    const data = {
      datasets: [{
        label: 'Antidepresivos - Eficacia vs Tolerabilidad',
        data: [
          { x: 85, y: 88, r: 15, name: 'Escitalopram' },
          { x: 82, y: 85, r: 12, name: 'Sertralina' },
          { x: 80, y: 82, r: 11, name: 'Fluoxetina' },
          { x: 78, y: 80, r: 10, name: 'Paroxetina' },
          { x: 75, y: 78, r: 9, name: 'Citalopram' },
          { x: 88, y: 75, r: 13, name: 'Venlafaxina' },
          { x: 83, y: 77, r: 11, name: 'Duloxetina' }
        ],
        backgroundColor: (ctx) => {
          const point = ctx.parsed;
          if (ctx.dataIndex === 0) { // Escitalopram
            return 'rgba(59, 130, 246, 0.7)';
          }
          return 'rgba(156, 163, 175, 0.5)';
        },
        borderColor: (ctx) => {
          if (ctx.dataIndex === 0) { // Escitalopram
            return 'rgb(59, 130, 246)';
          }
          return 'rgb(156, 163, 175)';
        },
        borderWidth: 2
      }]
    };

    const config = {
      type: 'bubble',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Comparación de Eficacia y Tolerabilidad de Antidepresivos',
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim(),
            titleColor: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
            bodyColor: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim(),
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim(),
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                const point = context.raw;
                return [
                  `Medicamento: ${point.name}`,
                  `Eficacia: ${point.x}%`,
                  `Tolerabilidad: ${point.y}%`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Eficacia (%)',
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
            },
            min: 70,
            max: 95,
            grid: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim()
            },
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
            }
          },
          y: {
            title: {
              display: true,
              text: 'Tolerabilidad (%)',
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
            },
            min: 70,
            max: 95,
            grid: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim()
            },
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
            }
          }
        },
        interaction: {
          mode: 'point'
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const element = elements[0];
            const dataPoint = data.datasets[0].data[element.index];
            this.highlightMedication(dataPoint.name);
          }
        }
      }
    };

    this.chartInstance = new Chart(ctx, config);
    
    // Update chart colors when theme changes
    const observer = new MutationObserver(() => {
      if (this.chartInstance) {
        this.updateChartColors();
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  updateChartColors() {
    if (!this.chartInstance) return;

    const options = this.chartInstance.options;
    
    // Update text colors
    options.plugins.title.color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
    options.scales.x.title.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    options.scales.y.title.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    options.scales.x.grid.color = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
    options.scales.y.grid.color = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
    options.scales.x.ticks.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    options.scales.y.ticks.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();

    this.chartInstance.update();
  }

  highlightMedication(medicationName) {
    // Find medication section and highlight it
    const sections = document.querySelectorAll('.escitalopram-card');
    sections.forEach(section => {
      const text = section.textContent.toLowerCase();
      if (text.includes(medicationName.toLowerCase())) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        section.style.transform = 'translateY(-4px)';
        section.style.boxShadow = '0 12px 35px var(--shadow-medium)';
        section.style.borderColor = 'var(--accent-primary)';
        
        setTimeout(() => {
          section.style.transform = '';
          section.style.boxShadow = '';
          section.style.borderColor = '';
        }, 3000);
      }
    });
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    // Add smooth scrolling to internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Public method to update chart if needed
  updateChart() {
    if (this.chartInstance) {
      this.chartInstance.update();
    }
  }

  // Public method to destroy chart
  destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}

// Initialize the enhancer
const escitalopramEnhancer = new EscitalopramArticleEnhancer();

// Export for potential external use
window.EscitalopramArticleEnhancer = EscitalopramArticleEnhancer;
