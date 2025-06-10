document.addEventListener("DOMContentLoaded", function () {
    // Handle form submission
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        if (email === "" || password === "") {
            alert("Please fill in all fields.");
        } else {
            alert(`Welcome, ${email}! You have successfully signed in.`);
            // Here, you would send data to a backend for authentication
        }
    });

    // Forgot password functionality
    document.querySelector(".forget").addEventListener("click", function (event) {
        event.preventDefault();
        const email = prompt("Enter your email to receive a password reset link:");
        if (email) {
            alert(`A password reset link has been sent to ${email}.`);
            // In a real application, an API request would be made here
        }
    });

    // Google Sign-In functionality (this requires actual Google OAuth implementation)
    document.getElementById("lgoogle").addEventListener("click", function (event) {
        event.preventDefault();
        alert("Redirecting to Google Sign-In...");
        // Normally, you would redirect to Google's authentication service here
    });
});

document.getElementById("lguestButton").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Simulated guest validation logic
    let isGuestAllowed = true; // Change this based on your validation rules

    if (isGuestAllowed) {
        alert("Guest login successful!");
        window.location.href = "guest-dashboard.html"; // Redirect to guest dashboard
    } else {
        alert("Guest login is not allowed at this time.");
    }
});