let ipRecorded = false;
let coordsRecorded = false;

function checkCompletion() {
    if (ipRecorded && coordsRecorded) {
        document.getElementById('finalMessage').textContent = "We found you!";
    }
}

// Function to get and display the IP address
document.getElementById('recordIpBtn').addEventListener('click', function() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipDisplay').textContent = `Your IP Address: ${data.ip}`;
            console.log(`IP Address Recorded: ${data.ip}`);
            ipRecorded = true;
            checkCompletion();
        })
        .catch(error => {
            console.error('Error fetching the IP address:', error);
        });
});

// Function to get and display the coordinates
document.getElementById('recordCoordsBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById('coordsDisplay').textContent = `Your Coordinates: Latitude ${latitude}, Longitude ${longitude}`;
            console.log(`Coordinates Recorded: Latitude ${latitude}, Longitude ${longitude}`);
            coordsRecorded = true;
            checkCompletion();
        }, function(error) {
            console.error('Error getting the coordinates:', error);
        });
    } else {
        document.getElementById('coordsDisplay').textContent = 'Geolocation is not supported by this browser.';
    }
});
