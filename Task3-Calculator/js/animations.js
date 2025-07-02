// ===== ANIMATIONS & VISUAL EFFECTS =====
class AnimationHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.addButtonAnimations();
        this.addDisplayAnimations();
        this.addLoadingAnimations();
        this.addParticleEffects();
        this.addSoundEffects();
        
        console.log('✨ Animation system loaded');
    }
    
    addButtonAnimations() {
        document.querySelectorAll('.btn').forEach(button => {
            // Ripple effect on click
            button.addEventListener('click', (e) => {
                this.createRipple(e);
            });
            
            // Hover glow effect
            button.addEventListener('mouseenter', () => {
                this.addGlowEffect(button);
            });
            
            button.addEventListener('mouseleave', () => {
                this.removeGlowEffect(button);
            });
        });
    }
    
    createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Add ripple animation CSS if not exists
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    addGlowEffect(button) {
        button.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
        button.style.transform = 'translateY(-2px) scale(1.02)';
    }
    
    removeGlowEffect(button) {
        button.style.boxShadow = '';
        button.style.transform = '';
    }
    
    addDisplayAnimations() {
        const display = document.getElementById('current-display');
        const originalUpdate = window.calculator?.updateDisplay;
        
        if (originalUpdate) {
            window.calculator.updateDisplay = function() {
                // Call original function
                originalUpdate.call(this);
                
                // Add typewriter effect for number changes
                display.style.opacity = '0.7';
                display.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    display.style.opacity = '1';
                    display.style.transform = 'scale(1)';
                }, 50);
            };
        }
    }
    
    addLoadingAnimations() {
        // Animate calculator entrance
        const calculator = document.querySelector('.calculator');
        const info = document.querySelector('.calculator-info');
        
        calculator.style.opacity = '0';
        calculator.style.transform = 'translateY(50px) scale(0.9)';
        
        info.style.opacity = '0';
        info.style.transform = 'translateX(50px)';
        
        // Animate in after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                calculator.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                calculator.style.opacity = '1';
                calculator.style.transform = 'translateY(0) scale(1)';
            }, 200);
            
            setTimeout(() => {
                info.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                info.style.opacity = '1';
                info.style.transform = 'translateX(0)';
            }, 400);
        });
    }
    
    addParticleEffects() {
        // Particle system for special operations
        this.particleContainer = document.createElement('div');
        this.particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        `;
        document.body.appendChild(this.particleContainer);
        
        // Override calculate function to add particles
        const originalCalculate = window.calculator?.calculate;
        if (originalCalculate) {
            window.calculator.calculate = function() {
                // Call original function
                originalCalculate.call(this);
                
                // Add particle effect
                window.animationHandler.createParticles();
            };
        }
    }
    
    createParticles() {
        const calculator = document.querySelector('.calculator');
        const rect = calculator.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: ${this.getRandomColor()};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.particleContainer.appendChild(particle);
            
            // Animate particle
            const angle = (i * 30) * Math.PI / 180;
            const velocity = 50 + Math.random() * 50;
            const endX = centerX + Math.cos(angle) * velocity;
            const endY = centerY + Math.sin(angle) * velocity;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }
    
    getRandomColor() {
        const colors = [
            '#667eea', '#764ba2', '#00d2ff', '#3a7bd5',
            '#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    addSoundEffects() {
        // Simple sound effects using Web Audio API
        this.audioContext = null;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            return;
        }
        
        // Add sound to button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                this.playClickSound(button);
            });
        });
    }
    
    playClickSound(button) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Different tones for different button types
        let frequency = 800;
        if (button.classList.contains('btn-number')) {
            frequency = 600;
        } else if (button.classList.contains('btn-operation')) {
            frequency = 900;
        } else if (button.classList.contains('btn-equals')) {
            frequency = 1000;
        } else if (button.classList.contains('btn-clear')) {
            frequency = 400;
        }
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    // Theme animations
    addThemeTransitions() {
        const calculator = document.querySelector('.calculator');
        const infCards = document.querySelectorAll('.info-card');
        
        calculator.style.transition = 'all 0.3s ease';
        infCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
        });
    }
    
    // Celebration animation for special results
    celebrateResult(result) {
        // Check for special numbers
        const specialNumbers = [42, 69, 420, 1337, 2024, 2025];
        const resultNum = parseFloat(result);
        
        if (specialNumbers.includes(resultNum)) {
            this.showCelebration();
        }
    }
    
    showCelebration() {
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 20);
        }
        
        // Show special message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 2rem;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 1001;
            animation: bounce 0.5s ease;
        `;
        message.textContent = '🎉 Special number!';
        
        // Add bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
                40% { transform: translate(-50%, -50%) translateY(-30px); }
                60% { transform: translate(-50%, -50%) translateY(-15px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 2000);
    }
    
    createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 8px;
            height: 8px;
            background: ${this.getRandomColor()};
            border-radius: 2px;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(confetti);
        
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(720deg)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        };
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeAnimations();
        this.addIntersectionObserver();
        this.preloadAssets();
    }
    
    optimizeAnimations() {
        // Use requestAnimationFrame for smooth animations
        this.animationQueue = [];
        this.isAnimating = false;
    }
    
    queueAnimation(callback) {
        this.animationQueue.push(callback);
        if (!this.isAnimating) {
            this.processAnimationQueue();
        }
    }
    
    processAnimationQueue() {
        if (this.animationQueue.length === 0) {
            this.isAnimating = false;
            return;
        }
        
        this.isAnimating = true;
        const callback = this.animationQueue.shift();
        
        requestAnimationFrame(() => {
            callback();
            this.processAnimationQueue();
        });
    }
    
    addIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.info-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    preloadAssets() {
        // Preload any assets that might be needed
        console.log('🚀 Performance optimizations applied');
    }
}

// Initialize animation system
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.animationHandler = new AnimationHandler();
        window.performanceOptimizer = new PerformanceOptimizer();
        
        console.log('🎬 Animation system ready!');
    }, 500);
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationHandler, PerformanceOptimizer };
}
