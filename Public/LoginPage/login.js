// Client-side JavaScript

// Function to extract query parameters from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Check if an error parameter exists in the URL
const errorMessage = getQueryParam('error');
if (errorMessage) {
    // Display an alert with the error message
    alert(errorMessage);
}
