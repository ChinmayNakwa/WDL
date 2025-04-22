function validateLoginForm() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let isValid = true;

    if (!username.value.trim()) {
        username.classList.add('is-invalid');
        isValid = false;
    } else {
        username.classList.remove('is-invalid');
    }

    if (!password.value.trim()) {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    return isValid;
}

function validateRegisterForm() {
    const username = document.getElementById('regUsername');
    const email = document.getElementById('email');
    const password = document.getElementById('regPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    let isValid = true;

    // Username validation
    if (!username.value.trim()) {
        username.classList.add('is-invalid');
        isValid = false;
    } else {
        username.classList.remove('is-invalid');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }

    // Password validation
    if (password.value.length < 6) {
        password.classList.add('is-invalid');
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
    }

    // Confirm password validation
    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        isValid = false;
    } else {
        confirmPassword.classList.remove('is-invalid');
    }

    return isValid;
}