function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Check if an error parameter exists in the URL
const errorMessage = getQueryParam('message');
if (errorMessage) {
    // Display an alert with the error message
    alert(errorMessage);
}