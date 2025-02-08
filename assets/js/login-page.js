document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupModal = document.getElementById('signupModal');
    const switchToSignupLink = document.getElementById('switchToSignup');
    const switchToLoginLink = document.getElementById('switchToLogin');

    // Switch to Signup
    switchToSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.login-wrapper').style.display = 'none';
        signupModal.style.display = 'block';
    });

    // Switch to Login
    switchToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        document.querySelector('.login-wrapper').style.display = 'block';
    });

    // Login Form Submission
    loginForm.addEventListener('submit', async (e) => {
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

                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                alert('Login failed: ' + result.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        }
    });

    // Signup Form Submission
    signupForm.addEventListener('submit', async (e) => {
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

                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                alert('Signup failed: ' + result.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup.');
        }
    });
});
