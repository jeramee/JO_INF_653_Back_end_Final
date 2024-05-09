document.getElementById('api-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get input values from the form
    // Example: const paramName = document.getElementById('param-name').value;

    // Construct the API URL based on input values
    const apiUrl = '/states'; // Example API endpoint

    try {
        // Make GET request to the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Display response data on the page
        document.getElementById('response-data').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});    
