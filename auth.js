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