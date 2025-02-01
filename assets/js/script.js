document.addEventListener('DOMContentLoaded', () => {
    // Book navigation with improved button handling
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const book = btn.dataset.book;
            if (book) {
                // Add a subtle animation before navigation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = `${book}.html`;
                }, 200);
            }
        });

        // Add hover effect for button icon
        btn.addEventListener('mouseenter', () => {
            const icon = btn.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });

        btn.addEventListener('mouseleave', () => {
            const icon = btn.querySelector('.btn-icon');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Split screen hover effects with improved transitions
    const left = document.querySelector('.split.left');
    const right = document.querySelector('.split.right');
    const container = document.querySelector('.split-container');

    if (left && right && container) {
        const handleSplitHover = (side, enter) => {
            const scale = enter ? 1.02 : 1;
            const opacity = enter ? 1 : 0.9;
            
            if (side === 'left') {
                left.style.transform = `scale(${scale})`;
                left.querySelector('.book-preview').style.opacity = opacity;
            } else {
                right.style.transform = `scale(${scale})`;
                right.querySelector('.book-preview').style.opacity = opacity;
            }
        };

        left.addEventListener('mouseenter', () => handleSplitHover('left', true));
        left.addEventListener('mouseleave', () => handleSplitHover('left', false));
        right.addEventListener('mouseenter', () => handleSplitHover('right', true));
        right.addEventListener('mouseleave', () => handleSplitHover('right', false));
    }

    // Mobile Menu Functionality with improved animations
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Add slide animation
            if (navLinks.classList.contains('active')) {
                navLinks.style.transform = 'translateY(0)';
                navLinks.style.opacity = '1';
            } else {
                navLinks.style.transform = 'translateY(-10px)';
                navLinks.style.opacity = '0';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                navLinks.style.transform = 'translateY(-10px)';
                navLinks.style.opacity = '0';
            }
        });
    }

    // Add shadow to navigation on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Form submissions
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to the newsletter!');
            newsletterForm.reset();
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.book-content, .author-content, .contact-content').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});
