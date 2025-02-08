document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    // Function to validate form inputs
    function validateForm() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;

        // Password validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return false;
        }

        // Password strength check
        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        // Username validation
        if (username.length < 3) {
            alert('Username must be at least 3 characters long');
            return false;
        }

        return true;
    }

    // Function to collect form data
    function collectFormData() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value || null,
            birthdate: document.getElementById('birthdate').value || null
        };
    }

    // Signup form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Collect form data
        const userData = collectFormData();

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (result.success) {
                // Store user details in localStorage for auto-login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', userData.username);
                localStorage.setItem('userDetails', JSON.stringify(userData));

                // Show success message
                alert('Signup successful! Welcome to the website.');

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

    // Optional: Pre-fill form if returning user
    function prefillForm() {
        const savedDetails = localStorage.getItem('userDetails');
        if (savedDetails) {
            const userData = JSON.parse(savedDetails);
            
            // Prefill non-sensitive fields
            document.getElementById('firstName').value = userData.firstName || '';
            document.getElementById('lastName').value = userData.lastName || '';
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('birthdate').value = userData.birthdate || '';
        }
    }

    // Call prefill function on page load
    prefillForm();
});
