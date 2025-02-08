document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignupBtn = document.getElementById('switchToSignup');
    const switchToLoginBtn = document.getElementById('switchToLogin');
    const closeModalBtn = document.querySelector('.close');

    // Show modal on page load
    window.onload = () => {
        authModal.style.display = 'block';
    };

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
                authModal.style.display = 'none';
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
                authModal.style.display = 'none';
                alert('Signup successful! You can now log in.');
            } else {
                alert('Signup failed: ' + result.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup.');
        }
    };
});
