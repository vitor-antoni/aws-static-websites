// assets/js/redirect.js

(function() {
    let countdownElement = document.getElementById('countdown');
    let seconds = 5;

    // Set the initial value in the element
    countdownElement.textContent = seconds;

    const interval = setInterval(() => {
        seconds--;
        countdownElement.textContent = seconds;

        if (seconds <= 0) {
            clearInterval(interval);
            // Redirect to the homepage
            window.location.href = '/';
        }
    }, 1000);
})();