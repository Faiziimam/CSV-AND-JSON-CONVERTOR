// app.js

document.addEventListener('DOMContentLoaded', function () {
    const csvToJsonForm = document.getElementById('csvToJsonForm');
    const jsonToCsvForm = document.getElementById('jsonToCsvForm');
    const errorMessage = document.getElementById('errorMessage');

    // Handle CSV to JSON conversion
    csvToJsonForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const csvFile = document.getElementById('csvFile').files[0];
        if (!csvFile) {
            showErrorMessage('Please select a CSV file.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', csvFile);
            
            const response = await fetch('/api/csv-to-json', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const error = await response.json();
                showErrorMessage(error.error || 'Error converting file.');
                return;
            }

            const jsonData = await response.json();
            const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
            const jsonUrl = URL.createObjectURL(jsonBlob);
            
            // Create an invisible link to trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = jsonUrl;
            downloadLink.download = 'converted.json';  // Set the default filename
            document.body.appendChild(downloadLink);
            downloadLink.click();  // Trigger the download
            document.body.removeChild(downloadLink);  // Clean up
            hideErrorMessage();
        } catch (error) {
            showErrorMessage('An error occurred during conversion.');
        }
    });

    // Handle JSON to CSV conversion
    jsonToCsvForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const jsonFile = document.getElementById('jsonFile').files[0];
        if (!jsonFile) {
            showErrorMessage('Please select a JSON file.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', jsonFile);

            const response = await fetch('/api/json-to-csv', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                showErrorMessage(error.error || 'Error converting file.');
                return;
            }

            const csvBlob = await response.blob();
            const csvUrl = URL.createObjectURL(csvBlob);
            
            // Create an invisible link to trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = csvUrl;
            downloadLink.download = 'converted.csv';  // Set the default filename
            document.body.appendChild(downloadLink);
            downloadLink.click();  // Trigger the download
            document.body.removeChild(downloadLink);  // Clean up
            hideErrorMessage();
        } catch (error) {
            showErrorMessage('An error occurred during conversion.');
        }
    });

    function showErrorMessage(message) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = message;
    }

    function hideErrorMessage() {
        errorMessage.style.display = 'none';
    }
});
