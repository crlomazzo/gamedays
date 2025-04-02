// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Skip authentication check for login page
    if (window.location.pathname.endsWith('login.html')) {
        return;
    }

    // Check if user is authenticated
    const cookies = document.cookie.split(';');
    const isAuthenticated = cookies.some(cookie => 
        cookie.trim().startsWith('authenticated=true')
    );

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
    }
});

// Hashed version of 'Gamedays' using SHA-256
const HASHED_PASSWORD = '89b623c3712009c6d8c9f77e26073c67d2dd90b7ea5fec32df27910d1cd92349';

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function verifyPassword(password) {
    const hashedInput = await hashPassword(password);
    return hashedInput === HASHED_PASSWORD;
}

async function handleLogin(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const isValid = await verifyPassword(password);
    
    if (isValid) {
        const popup = document.getElementById('welcomePopup');
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
    return false;
}

function openEmail() {
    document.cookie = "authenticated=true; path=/; secure; samesite=strict";
    window.location.href = 'index.html';
} 