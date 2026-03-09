// ===== GLOBAL VARIABLES =====
let currentSection = 'home';
let isScrolling = false;

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-bar');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeForm();
    initializeSkillBars();
    typeWriterEffect();
    
    console.log('🎨 Portfolio loaded successfully!');
    console.log('👨‍💻 John Doe - Full Stack Developer');
    console.log('🏷️ #codsoft #webdevelopment #internship');
});

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        updateActiveNavLink(sectionId);
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar scroll effect
        handleNavbarScroll(scrollTop, lastScrollTop);
        
        // Update active navigation
        updateActiveSection();
        
        // Back to top button
        toggleBackToTop(scrollTop);
        
        // Parallax effects
        handleParallaxEffects(scrollTop);
        
        lastScrollTop = scrollTop;
    }, 10));
    
    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function handleNavbarScroll(scrollTop, lastScrollTop) {
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update for dark theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        } else {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (currentSection !== sectionId) {
                currentSection = sectionId;
                updateActiveNavLink(sectionId);
            }
        }
    });
}

function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

function toggleBackToTop(scrollTop) {
    if (scrollTop > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

function handleParallaxEffects(scrollTop) {
    const heroSection = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.element');
    
    if (heroSection && scrollTop < window.innerHeight) {
        const parallaxSpeed = scrollTop * 0.5;
        heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrollTop * speed}px) rotate(${scrollTop * 0.1}deg)`;
        });
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animations
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Card hover effects
    initializeCardEffects();
}

function initializeCardEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Project card special effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');
        
        card.addEventListener('mouseenter', () => {
            if (overlay) overlay.style.opacity = '1';
            if (image) image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (overlay) overlay.style.opacity = '0';
            if (image) image.style.transform = 'scale(1)';
        });
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-level') + '%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
            }
        };
        
        updateCounter();
    });
}

// ===== TYPEWRITER EFFECT =====
function typeWriterEffect() {
    const heroName = document.querySelector('.hero-name');
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroName || !heroTitle) return;
    
    const nameText = heroName.textContent;
    const titleText = heroTitle.textContent;
    
    heroName.textContent = '';
    heroTitle.textContent = '';
    
    let nameIndex = 0;
    let titleIndex = 0;
    
    const typeNameChar = () => {
        if (nameIndex < nameText.length) {
            heroName.textContent += nameText.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeNameChar, 100);
        } else {
            setTimeout(typeTitleChar, 500);
        }
    };
    
    const typeTitleChar = () => {
        if (titleIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitleChar, 80);
        }
    };
    
    setTimeout(typeNameChar, 1000);
}

// ===== FORM HANDLING =====
function initializeForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Form field validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function validateForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!data.subject || data.subject.trim().length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError('email', 'Please enter a valid email address');
            }
            break;
        case 'subject':
            if (value.length < 5) {
                showFieldError('subject', 'Subject must be at least 5 characters long');
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters long');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = 'var(--accent-color)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-xs)';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
    field.style.borderColor = 'var(--accent-color)';
}

function clearFieldError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = 'var(--border-color)';
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--primary-color)'};
        color: white;
        padding: var(--space-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-large);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--space-md);">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: var(--font-size-lg); margin-left: auto;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
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

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Preload images when they come into view
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== ANALYTICS & TRACKING =====
function trackEvent(eventName, eventData = {}) {
    // Add your analytics tracking code here
    console.log(`Event: ${eventName}`, eventData);
}

// Track navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('navigation_click', {
            section: link.getAttribute('data-section')
        });
    });
});

// Track project clicks
document.querySelectorAll('.project-links a').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('project_link_click', {
            project: link.closest('.project-card').querySelector('h3').textContent,
            link_type: link.getAttribute('aria-label')
        });
    });
});

// ===== EASTER EGG =====
let clickCount = 0;
const logo = document.querySelector('.logo-text');

if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🎉 Easter egg found! Thanks for exploring my portfolio!', 'success');
            logo.style.animation = 'spin 1s ease-in-out';
            clickCount = 0;
            
            setTimeout(() => {
                logo.style.animation = '';
            }, 1000);
        }
    });
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // You can add error reporting here
});

// ===== PRINT STYLES =====
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===== FINAL SETUP =====
console.log('🚀 Portfolio JavaScript initialized successfully!');
console.log('💼 Features loaded: Navigation, Animations, Theme Toggle, Form Validation');
console.log('📱 Responsive design active');
console.log('♿ Accessibility features enabled');
console.log('🎨 Dark/Light theme available');
