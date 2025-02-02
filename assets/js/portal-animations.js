document.addEventListener('DOMContentLoaded', () => {
    const portalButtons = document.querySelectorAll('.explore-btn');
    
    portalButtons.forEach(button => {
        button.classList.add('portal-btn');
        
        button.addEventListener('click', function(e) {
            // Prevent default link behavior
            e.preventDefault();
            
            // Add activation class
            this.classList.add('portal-activated');
            
            // Get the target URL from the button
            const targetUrl = this.getAttribute('data-url') || 
                (this.dataset.book === 'neltopia' ? 'missing-children.html' : 
                 this.dataset.book === 'sporelle' ? 'sporelle.html' : 'index.html');
            
            // Redirect after animation
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 800);
        });
    });
});
