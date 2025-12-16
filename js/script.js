// ============================================
// ELITE PORTFOLIO JAVASCRIPT
// With Dark Mode & Animated Background
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        scrollThreshold: 50,
        observerThreshold: 0.15,
        skillAnimationDelay: 100,
        typingSpeed: 80,
        typingPause: 2000
    };

    // Code snippets for background animation
    const CODE_SNIPPETS = [
        'const build = () => scalable();',
        'function deploy() { return production; }',
        'class Engineer { construct() }',
        'import { precision } from "craft";',
        'export default purpose;',
        'async function innovate() {}',
        'return quality.code();',
        'while(learning) { grow(); }',
        'if(challenge) solve();',
        'const future = await build();'
    ];

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    const utils = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

    // ============================================
    // DARK MODE
    // ============================================
    class DarkMode {
        constructor() {
            this.toggle = document.getElementById('themeToggle');
            this.icon = this.toggle.querySelector('.theme-icon');
            this.init();
        }

        init() {
            // Check for saved theme preference or default to light mode
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.setTheme(savedTheme);

            this.toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        }

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            this.icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // ============================================
    // TYPING EFFECT
    // ============================================
    class TypingEffect {
        constructor() {
            this.element = document.getElementById('typingText');
            this.text = 'Building scalable systems with precision and purpose';
            this.index = 0;
            this.init();
        }

        init() {
            this.type();
        }

        type() {
            if (this.index < this.text.length) {
                this.element.textContent += this.text.charAt(this.index);
                this.index++;
                setTimeout(() => this.type(), CONFIG.typingSpeed);
            } else {
                setTimeout(() => {
                    this.delete();
                }, CONFIG.typingPause);
            }
        }

        delete() {
            if (this.index > 0) {
                this.element.textContent = this.text.substring(0, this.index - 1);
                this.index--;
                setTimeout(() => this.delete(), CONFIG.typingSpeed / 2);
            } else {
                setTimeout(() => {
                    this.type();
                }, 500);
            }
        }
    }

    // ============================================
    // CODE RAIN BACKGROUND
    // ============================================
    class CodeRain {
        constructor() {
            this.container = document.getElementById('codeRain');
            this.lines = [];
            this.maxLines = 15;
            this.init();
        }

        init() {
            this.createLines();
            setInterval(() => this.addLine(), 2000);
        }

        createLines() {
            for (let i = 0; i < this.maxLines; i++) {
                setTimeout(() => this.addLine(), i * 300);
            }
        }

        addLine() {
            if (this.lines.length >= this.maxLines) {
                const oldLine = this.lines.shift();
                if (oldLine && oldLine.parentNode) {
                    oldLine.parentNode.removeChild(oldLine);
                }
            }

            const line = document.createElement('div');
            line.className = 'code-line';
            line.textContent = CODE_SNIPPETS[utils.getRandomInt(0, CODE_SNIPPETS.length - 1)];
            line.style.left = `${utils.getRandomInt(0, 100)}%`;
            line.style.animationDuration = `${utils.getRandomInt(10, 20)}s`;
            line.style.animationDelay = `${utils.getRandomInt(0, 5)}s`;

            this.container.appendChild(line);
            this.lines.push(line);

            // Remove after animation
            setTimeout(() => {
                if (line.parentNode) {
                    line.parentNode.removeChild(line);
                }
            }, 20000);
        }
    }

    // ============================================
    // NAVIGATION
    // ============================================
    class Navigation {
        constructor() {
            this.nav = document.querySelector('.nav');
            this.links = document.querySelectorAll('.nav-links a[href^="#"]');
            this.init();
        }

        init() {
            this.setupScrollEffect();
            this.setupSmoothScroll();
            this.setupActiveLink();
        }

        setupScrollEffect() {
            const handleScroll = utils.throttle(() => {
                if (window.scrollY > CONFIG.scrollThreshold) {
                    this.nav.classList.add('scrolled');
                } else {
                    this.nav.classList.remove('scrolled');
                }
            }, 100);

            window.addEventListener('scroll', handleScroll);
        }

        setupSmoothScroll() {
            this.links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        setupActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            
            const handleScroll = utils.throttle(() => {
                const scrollPosition = window.scrollY + 100;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        this.links.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, 100);

            window.addEventListener('scroll', handleScroll);
        }
    }

    // ============================================
    // INTERSECTION OBSERVER
    // ============================================
    class ScrollReveal {
        constructor() {
            this.elements = document.querySelectorAll(
                '.section-title, .about-text, .skill-category, .project-card, .contact-intro, .contact-item'
            );
            this.init();
        }

        init() {
            const observerOptions = {
                threshold: CONFIG.observerThreshold,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 50);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            this.elements.forEach(element => {
                observer.observe(element);
            });
        }
    }

    // ============================================
    // SKILLS ANIMATION
    // ============================================
    class SkillsAnimation {
        constructor() {
            this.skillItems = document.querySelectorAll('.skill-item');
            this.init();
        }

        init() {
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateSkills(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            this.skillItems.forEach(item => {
                const level = item.getAttribute('data-level');
                const progressBar = item.querySelector('.skill-progress');
                progressBar.style.setProperty('--skill-level', `${level}%`);
                observer.observe(item);
            });
        }

        animateSkills(skillItem) {
            setTimeout(() => {
                skillItem.classList.add('animate');
            }, CONFIG.skillAnimationDelay);
        }
    }

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    class ParallaxEffects {
        constructor() {
            this.profileImage = document.querySelector('.profile-image');
            this.init();
        }

        init() {
            const handleMouseMove = utils.throttle((e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const xOffset = (clientX / innerWidth - 0.5) * 20;
                const yOffset = (clientY / innerHeight - 0.5) * 20;

                if (this.profileImage) {
                    this.profileImage.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                }
            }, 50);

            document.addEventListener('mousemove', handleMouseMove);
        }
    }

    // ============================================
    // SCROLL TO TOP
    // ============================================
    class ScrollToTop {
        constructor() {
            this.createButton();
        }

        createButton() {
            const button = document.createElement('button');
            button.innerHTML = '↑';
            button.className = 'scroll-to-top';
            button.setAttribute('aria-label', 'Scroll to top');
            button.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--color-primary);
                color: white;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            `;

            document.body.appendChild(button);

            const handleScroll = utils.throttle(() => {
                if (window.scrollY > 500) {
                    button.style.opacity = '1';
                    button.style.visibility = 'visible';
                } else {
                    button.style.opacity = '0';
                    button.style.visibility = 'hidden';
                }
            }, 100);

            window.addEventListener('scroll', handleScroll);

            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-4px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        }
    }

    // ============================================
    // APPLICATION INITIALIZATION
    // ============================================
    class PortfolioApp {
        constructor() {
            this.components = [];
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        }

        initializeComponents() {
            try {
                this.components = [
                    new DarkMode(),
                    new TypingEffect(),
                    new CodeRain(),
                    new Navigation(),
                    new ScrollReveal(),
                    new SkillsAnimation(),
                    new ParallaxEffects(),
                    new ScrollToTop()
                ];

                console.log('Portfolio initialized successfully');
            } catch (error) {
                console.error('Error initializing portfolio:', error);
            }
        }
    }

    // ============================================
    // START APPLICATION
    // ============================================
    new PortfolioApp();

})();
 