document.addEventListener('DOMContentLoaded', () => {
    // Authentication Icons
    const loginIcon = document.getElementById('loginIcon');
    const signupIcon = document.getElementById('signupIcon');
    const userProfileIcon = document.getElementById('userProfileIcon');

    // Check if user is already logged in
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');

        if (isLoggedIn) {
            loginIcon.style.display = 'none';
            signupIcon.style.display = 'none';
            userProfileIcon.style.display = 'block';
            userProfileIcon.innerHTML = `<i class="fas fa-user" title="Profile (${username})"></i>`;
        } else {
            loginIcon.style.display = 'block';
            signupIcon.style.display = 'block';
            userProfileIcon.style.display = 'none';
        }
    }

    // Initial auth status check
    checkAuthStatus();

    // Logout functionality for profile icon
    userProfileIcon.addEventListener('click', () => {
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');

        // Update icons
        checkAuthStatus();

        alert('You have been logged out.');
    });
});
