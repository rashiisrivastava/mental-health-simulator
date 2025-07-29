let username = "";
let moods = [];
let chart;

const thoughts = {
  "😊": "Keep smiling! Today is a great day.",
  "😔": "It's okay to feel sad. Be kind to yourself.",
  "😡": "Take a deep breath. Let your anger go.",
  "😌": "Stay relaxed and enjoy your peace.",
  "😫": "Remember to take breaks and breathe.",
  "😕": "Try to focus on one thing at a time."
};

const assistance = {
  "😊": [
    "That's amazing! 😊",
    "Keep spreading those good vibes.",
    "Remember to share your joy with others!",
    "You’re doing great—keep going!",
    "Take time to celebrate your achievements.",
    "Stay grateful for the little things."
  ],
  "😔": [
    "I'm here for you. 😔",
    "It’s okay to feel down sometimes.",
    "Try listening to calming music or taking a walk.",
    "Talking to a friend can help lift your spirits.",
    "Focus on small things that bring you peace.",
    "Take deep breaths and give yourself a break."
  ],
  "😡": [
    "Anger is a valid emotion. 😡",
    "Try to express your feelings constructively.",
    "Take a break—maybe some deep breathing or a walk.",
    "Write down what's bothering you to process it.",
    "Stay mindful of your triggers and responses.",
    "You are in control—even when emotions run high."
  ],
  "😌": [
    "Ah, calm and peaceful. 😌",
    "Enjoy this serene state—you’ve earned it!",
    "Take some time to reflect or meditate.",
    "Read a book or engage in something you love.",
    "Let this relaxation recharge your energy.",
    "Cherish the peace you’re feeling now."
  ],
  "😫": [
    "You’re feeling stressed. 😫",
    "Remember to breathe—slowly and deeply.",
    "Break your tasks into smaller steps.",
    "Take a short walk to refresh your mind.",
    "Make time for self-care today.",
    "It's okay to ask for help when needed."
  ],
  "😕": [
    "Feeling confused is natural. 😕",
    "Pause, reflect, and try to organize your thoughts.",
    "Journaling might help clarify your feelings.",
    "Talk to someone you trust about your thoughts.",
    "Avoid overthinking—focus on what you can control.",
    "Clarity often comes with time and patience."
  ]
};

const moodColors = {
  "😊": "#d4f8e8",
  "😔": "#dce6f1",
  "😡": "#fddede",
  "😌": "#e4f7f5",
  "😫": "#fbe4d8",
  "😕": "#e9e4f0"
};

function login() {
  username = document.getElementById("usernameInput").value.trim();
  if (!username) return alert("Enter a valid username!");

  localStorage.setItem("moodUsername", username);
  localStorage.setItem("moodData", JSON.stringify(moods));

  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
  document.getElementById("greeting").textContent = `Welcome, ${username}`;
  renderChart();
  updateChart(); 
}

function logMood(mood) {
  moods.push({ mood, date: new Date().toLocaleDateString() });
  localStorage.setItem("moodData", JSON.stringify(moods));
  updateUI(mood);
  updateChart();
}

function logout() {
  
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("usernameInput").value = "";
}

function updateUI(mood) {
  document.getElementById("thoughtBox").textContent = thoughts[mood];

  const tips = assistance[mood];
  const assistanceBox = document.getElementById("assistanceBox");
  assistanceBox.innerHTML = tips.map(tip => `<p>${tip}</p>`).join('');

  document.body.style.backgroundColor = moodColors[mood] || "#ffffff";
}

function renderChart() {
  const ctx = document.getElementById('moodChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Mood Over Time',
        data: [],
        backgroundColor: 'rgba(0, 140, 255, 0.2)',
        borderColor: 'rgba(0, 140, 255, 1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5
      }]
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 10
        }
      }
    }
  });
}

function updateChart() {
  chart.data.labels = moods.map((m, i) => m.date + " #" + (i + 1));
  chart.data.datasets[0].data = moods.map(m => moodToValue(m.mood));
  chart.update();
}

function moodToValue(mood) {
  switch (mood) {
    case "😊": return 9;
    case "😌": return 8;
    case "😕": return 5;
    case "😔": return 4;
    case "😫": return 3;
    case "😡": return 2;
    default: return 5;
  }
}
let darkMode = false;

function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
}
window.onload = function () {
  const savedUsername = localStorage.getItem("moodUsername");
  const savedMoods = localStorage.getItem("moodData");

  if (savedUsername && savedMoods) {
    username = savedUsername;
    moods = JSON.parse(savedMoods);

    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("greeting").textContent = `Welcome, ${username}`;
    renderChart();
    updateChart();
  }
};

