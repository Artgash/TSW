// Initialize variables for teams, and storage key
const teams = {
    "Argentina": 0,
    "England": 0,
    "Greece": 0,
    "Ireland": 0,
    "Japan": 0,
    "Netherlands": 0,
    "Portugal": 0,
    "Russia": 0,
    "San Marino": 0,
    "Vietnam": 0,
    "Belgium": 0,
    "Croatia": 0,
    "France": 0,
    "Italy": 0,
    "Mexico": 0,
    "Norway": 0,
    "South Korea": 0,
    "Spain": 0,
    "Ukraine": 0,
    "USA": 0,
    "China": 0,
    "Qatar": 0,
    "India": 0,
    "Morocco": 0,
    "Canada": 0,
    "Germany": 0,
    "Turkey": 0,
    "Saudi Arabia": 0,
    "Senegal": 0,
    "North Korea": 0,
    "Serbia": 0,
    "Brazil": 0,
    "Australia": 0,
    "Costa Rica": 0,
    "South Africa": 0,
    "Colombia": 0,
    "Iran": 0,
    "Peru": 0,
    "Uruguay": 0,
    "Scotland": 0,
};

// Get the vote button elements
const voteButtons = document.querySelectorAll(".vote-btn");
const voteCounters = document.querySelectorAll(".vote-counter");

// Check if there's an existing vote in localStorage
const existingVote = localStorage.getItem("vote");
if (existingVote) {
    teams[existingVote] += 1;  // Increment the vote for the team that was previously selected
    updateVoteCounts();        // Update the UI
}

// Function to update the vote counts on the page
function updateVoteCounts() {
    // Update the vote counts dynamically
    voteCounters.forEach(counter => {
        const teamName = counter.getAttribute('data-team');
        counter.textContent = teams[teamName] + " Votes";
    });
}

// Function to handle voting logic
voteButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const selectedTeam = e.target.getAttribute('data-team');

        // Only allow one vote per user (based on localStorage)
        if (localStorage.getItem("vote")) {
            const previousVote = localStorage.getItem("vote");
            if (previousVote !== selectedTeam) {
                // Decrement the previous team's vote
                teams[previousVote] -= 1;
            }
        }

        // Store the new vote in localStorage and increment the selected team's vote
        localStorage.setItem("vote", selectedTeam);
        teams[selectedTeam] += 1;

        // Update the UI with the new vote counts
        updateVoteCounts();
    });
});

// Initially populate the vote counts
updateVoteCounts();
