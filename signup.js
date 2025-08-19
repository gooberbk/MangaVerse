import { signUp } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.auth-form form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const user = await signUp(email, password);
                if (user) {
                    alert('Sign up successful! Please log in.');
                    window.location.href = 'login.html';
                }
            } catch (error) {
                alert(`Sign up failed: ${error.message}`);
            }
        });
    }
});
