document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignupBtn = document.getElementById('switchToSignup');
    const switchToLoginBtn = document.getElementById('switchToLogin');
    const closeModalBtn = document.querySelector('.close');

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

    // Show modal on login/signup icon click
    loginIcon.addEventListener('click', () => {
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
        authModal.style.display = 'block';
    });

    signupIcon.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        authModal.style.display = 'block';
    });

    // Close modal when clicking 'x'
    closeModalBtn.onclick = () => {
        authModal.style.display = 'none';
    };

    // Switch between login and signup forms
    switchToSignupBtn.onclick = () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
    };

    switchToLoginBtn.onclick = () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
    };

    // Login form submission
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            if (result.success) {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);

                // Hide modal and update icons
                authModal.style.display = 'none';
                checkAuthStatus();

                alert('Login successful!');
            } else {
                alert('Login failed: ' + result.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    };

    // Signup form submission
    signupForm.onsubmit = async (e) => {
        e.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newEmail = document.getElementById('newEmail').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: newUsername, 
                    email: newEmail, 
                    password: newPassword 
                })
            });

            const result = await response.json();
            if (result.success) {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', newUsername);

                // Hide modal and update icons
                authModal.style.display = 'none';
                checkAuthStatus();

                alert('Signup successful! You are now logged in.');
            } else {
                alert('Signup failed: ' + result.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup.');
        }
    };

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
