// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const floatingThemeToggle = document.getElementById('floatingThemeToggle');
const floatingThemeIcon = document.getElementById('floatingThemeIcon');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const backToTopBtn = document.getElementById('backToTop');
const body = document.body;

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = JSON.parse(localStorage.getItem('theme')) || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            this.updateThemeIcons(true);
        } else {
            body.removeAttribute('data-theme');
            this.updateThemeIcons(false);
        }
    }

    updateThemeIcons(isDark) {
        const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
        const toggleText = isDark ? 'Light' : 'Dark';
        
        themeIcon.className = iconClass;
        floatingThemeIcon.className = iconClass;
        
        const themeText = themeToggle.querySelector('span');
        if (themeText) {
            themeText.textContent = toggleText;
        }
    }

    toggle() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        localStorage.setItem('theme', JSON.stringify(newTheme));
    }

    bindEvents() {
        themeToggle.addEventListener('click', () => this.toggle());
        floatingThemeToggle.addEventListener('click', () => this.toggle());
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.menuIcon = mobileMenuBtn.querySelector('i');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleActiveStates();
    }

    bindEvents() {
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    toggleMobileMenu() {
        navLinks.classList.toggle('active');
        this.menuIcon.className = navLinks.classList.contains('active') 
            ? 'fas fa-times' 
            : 'fas fa-bars';
    }

    closeMobileMenu() {
        navLinks.classList.remove('active');
        this.menuIcon.className = 'fas fa-bars';
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    handleActiveStates() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - 300)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${current}`) {
                    a.classList.add('active');
                }
            });
        });
    }
}

// Scroll Management
class ScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleBackToTop();
        this.handleParallax();
    }

    handleBackToTop() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    handleParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupPageLoad();
        this.setupInteractiveElements();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupPageLoad() {
        // Initialize body opacity for smooth loading
        body.style.opacity = '0';
        
        window.addEventListener('load', () => {
            body.style.opacity = '1';
            body.style.transition = 'opacity 0.5s ease';
        });
    }

    setupInteractiveElements() {
        // Enhanced button interactions
        document.querySelectorAll('.btn, .project-link, .glass-card').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform.replace('translateY(0px)', '') + ' translateY(-2px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace('translateY(-2px)', '') + ' translateY(0px)';
            });
        });
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static addDynamicCursor() {
        document.addEventListener('mousemove', (e) => {
            let cursor = document.querySelector('.cursor');
            
            if (!cursor) {
                cursor = document.createElement('div');
                cursor.className = 'cursor';
                cursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: var(--accent-gradient);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: difference;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(cursor);
            }
            
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
    }

    static logWelcomeMessage() {
        console.log(`
        🚀 Welcome to Ahmed Ullah's Modern Portfolio!
        
        ✨ Features:
        • Glassmorphism Design
        • Dynamic Gradients
        • Advanced Animations
        • Responsive Layout
        • Dark/Light Mode
        • Modern CSS Grid & Flexbox
        
        📧 Let's connect: ahmedullah8341@gmail.com
        `);
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorPageLoad();
        this.setupLazyLoading();
    }

    monitorPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            if (loadTime > 3000) {
                console.warn('Page load time is above 3 seconds:', loadTime.toFixed(2) + 'ms');
            }
        });
    }

    setupLazyLoading() {
        // Lazy load images if any are added later
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// App Initialization
class PortfolioApp {
    constructor() {
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.scrollManager = new ScrollManager();
        this.animationManager = new AnimationManager();
        this.performanceMonitor = new PerformanceMonitor();
        
        this.init();
    }

    init() {
        // Initialize utility features
        Utils.addDynamicCursor();
        Utils.logWelcomeMessage();
        
        // Add custom styles for active navigation
        this.addActiveNavigationStyles();
        
        console.log('Portfolio application initialized successfully! ✨');
    }

    addActiveNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nav-links a.active {
                color: var(--primary-color) !important;
            }
            .nav-links a.active::after {
                width: 100% !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Additional event listeners for enhanced functionality
window.addEventListener('resize', Utils.debounce(() => {
    // Handle responsive adjustments if needed
    console.log('Window resized, adjusting layout...');
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.querySelector('.mobile-menu-btn i').className = 'fas fa-bars';
        }
    }
    
    // Theme toggle with keyboard shortcut (Ctrl + Shift + D)
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        document.querySelector('.theme-toggle').click();
    }
});

// Error handling for better user experience
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could add user-friendly error notifications here
});

// Service Worker registration (if you decide to add PWA features later)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}