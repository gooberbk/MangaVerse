import { signIn } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.auth-form form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const user = await signIn(email, password);
                if (user) {
                    window.location.href = 'admin.html';
                }
            } catch (error) {
                alert(`Login failed: ${error.message}`);
            }
        });
    }
});
