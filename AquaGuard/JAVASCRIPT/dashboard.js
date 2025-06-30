// Simulating real-time water usage data
let currentUsage = 0;
let waterSaved = 0;
let leakDetected = false;
let points = 0;

// Chart initialization
let ctxUsage = document.getElementById('usageChart').getContext('2d');
let usageChart = new Chart(ctxUsage, {
    type: 'line',
    data: {
        labels: [], // Dynamic labels
        datasets: [{
            label: 'Water Usage (liters)',
            data: [],
            borderColor: '#00796b',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Usage (liters)' } }
        }
    }
});

let ctxCost = document.getElementById('costChart').getContext('2d');
let costChart = new Chart(ctxCost, {
    type: 'line',
    data: {
        labels: [], // Dynamic labels
        datasets: [{
            label: 'Cost (USD)',
            data: [],
            borderColor: '#f57f17',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Cost (USD)' } }
        }
    }
});

// Update water usage every second
function updateWaterUsage() {
    let currentTime = new Date().toLocaleTimeString();

    currentUsage += Math.random() * 10;
    document.getElementById('current-usage').innerText = currentUsage.toFixed(2);

    let estimatedCost = (currentUsage * 0.02).toFixed(2);
    document.getElementById('monthly-cost').innerText = estimatedCost;

    waterSaved += Math.random() * 5;
    document.getElementById('water-saved').innerText = waterSaved.toFixed(2);

    usageChart.data.labels.push(currentTime);
    usageChart.data.datasets[0].data.push(currentUsage.toFixed(2));
    usageChart.update();

    costChart.data.labels.push(currentTime);
    costChart.data.datasets[0].data.push(estimatedCost);
    costChart.update();

    if (Math.random() > 0.95 && !leakDetected) {
        leakDetected = true;
        document.getElementById('leak-alert').innerText = "Leak detected! Check your pipes.";
        document.getElementById('leak-alert').style.color = "red";
    }

    updateRewards();
}

// Update rewards system
function updateRewards() {
    points += Math.floor(waterSaved / 10);
    document.getElementById('points-earned').innerText = points;
}

// Dark mode toggle
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Voice command functionality
if ('webkitSpeechRecognition' in window) {
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.toLowerCase();
        if (command.includes("water usage")) {
            alert("Here's your current water usage: " + currentUsage.toFixed(2) + " liters");
        } else if (command.includes("savings tip")) {
            alert("Tip: " + tips[Math.floor(Math.random() * tips.length)]);
        }
    };

    recognition.onerror = (event) => {
        console.error(event);
    };

    document.body.addEventListener('dblclick', () => {
        recognition.start();
    });
}

// Geolocation-based insights
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
                " Longitude: " + position.coords.longitude);
}

// Start updating water usage every second
setInterval(updateWaterUsage, 1000);
