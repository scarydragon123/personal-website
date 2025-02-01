document.addEventListener('DOMContentLoaded', () => {
    // Create floating elements based on theme
    const isNeltopia = document.body.classList.contains('neltopia-theme');
    const container = isNeltopia ? document.querySelector('.floating-symbols') : document.querySelector('.floating-crystals');
    
    // Create and animate floating elements
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = isNeltopia ? 'floating-symbol' : 'floating-crystal';
        
        // Random positioning and animation timing
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 5;
        const size = Math.random() * 20 + 10;
        
        element.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: -20px;
            width: ${size}px;
            height: ${size}px;
            animation: ${isNeltopia ? 'floatSymbol' : 'floatCrystal'} ${Math.random() * 3 + 4}s infinite;
            animation-delay: ${animationDelay}s;
            opacity: 0;
        `;
        
        if (isNeltopia) {
            element.innerHTML = '✧';
            element.style.color = 'var(--accent-color)';
        } else {
            element.style.background = 'var(--accent-color)';
            element.style.borderRadius = '2px';
            element.style.transform = 'rotate(45deg)';
        }
        
        container.appendChild(element);
    }

    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.excerpt-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatSymbol {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-1000%) rotate(360deg); opacity: 0; }
        }
        
        @keyframes floatCrystal {
            0% { transform: translateY(0) rotate(45deg); opacity: 0; }
            20% { opacity: 0.4; }
            80% { opacity: 0.4; }
            100% { transform: translateY(-1000%) rotate(405deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Pre-order button interaction
    const preOrderBtn = document.querySelector('.pre-order-btn');
    if (preOrderBtn) {
        preOrderBtn.addEventListener('click', () => {
            // Add your pre-order functionality here
            alert('Thank you for your interest! Pre-ordering will be available soon.');
        });
    }
});
