document.addEventListener("DOMContentLoaded", function () {
    const teams = [
        "Argentina", "England", "Greece", "Ireland", "Japan", "Netherlands",
        "Portugal", "Russia", "San Marino", "Vietnam",
        "Belgium", "Croatia", "France", "Italy", "Mexico", "Norway",
        "South Korea", "Spain", "Ukraine", "USA",
        "China", "Qatar", "India", "Morocco", "Canada", "Germany",
        "Turkey", "Saudi Arabia", "Senegal", "North Korea", "Serbia", "Brazil",
        "Australia", "Costa Rica", "South Africa", "Colombia", "Iran", "Peru",
        "Uruguay", "Scotland", "China", "Senegal"
    ];

    const voteButtons = document.querySelectorAll(".vote-button");
    const voteCounts = {};

    // Initialize vote counts from localStorage for each team
    teams.forEach((team) => {
        const count = parseInt(localStorage.getItem(`votes_${team}`)) || 0;
        voteCounts[team] = count;

        // Set initial vote count on the page
        const voteCountElement = document.querySelector(`.vote-count[data-team="${team}"]`);
        if (voteCountElement) {
            voteCountElement.textContent = count;
        }
    });

    // Function to update vote count on the page for each team
    function updateVoteCount(team) {
        const voteCountElement = document.querySelector(`.vote-count[data-team="${team}"]`);
        if (voteCountElement) {
            voteCountElement.textContent = voteCounts[team];
        }
    }

    // Handle vote button clicks for each team
    voteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const team = this.getAttribute("data-team");

            // Check if the user has voted for any team already
            const prevVote = localStorage.getItem('userVote');
            if (prevVote) {
                // If a user has voted before, decrement the vote of the previous team
                voteCounts[prevVote] -= 1;
                localStorage.setItem(`votes_${prevVote}`, voteCounts[prevVote]);
                updateVoteCount(prevVote);  // Update the previous team's vote count
            }

            // Increment the vote for the selected team
            voteCounts[team] += 1;
            localStorage.setItem(`votes_${team}`, voteCounts[team]);

            // Store the user's new vote in localStorage
            localStorage.setItem('userVote', team);

            // Update the displayed vote count for the selected team
            updateVoteCount(team);
        });
    });

    // Display real-time voting history (example: who voted for which team)
    function displayVoteHistory() {
        const voteHistoryContainer = document.querySelector(".vote-history");
        if (voteHistoryContainer) {
            voteHistoryContainer.innerHTML = "";  // Clear previous history

            teams.forEach((team) => {
                const historyItem = document.createElement("div");
                historyItem.classList.add("history-item");
                historyItem.textContent = `${team}: ${voteCounts[team]} votes`;
                voteHistoryContainer.appendChild(historyItem);
            });
        }
    }

    // Initialize the vote history display on page load
    displayVoteHistory();

    // Periodically update the vote history (e.g., every 5 seconds)
    setInterval(displayVoteHistory, 5000);

    // Handle the case when a user returns to the page
    const prevVote = localStorage.getItem('userVote');
    if (prevVote) {
        // If the user has already voted, highlight the team they voted for
        const selectedButton = document.querySelector(`.vote-button[data-team="${prevVote}"]`);
        if (selectedButton) {
            selectedButton.classList.add("voted");  // Add a visual cue for the voted team
        }
    }

    // Handle vote reset (optional functionality)
    const resetButton = document.querySelector(".reset-vote");
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            const prevVote = localStorage.getItem('userVote');
            if (prevVote) {
                voteCounts[prevVote] -= 1;
                localStorage.setItem(`votes_${prevVote}`, voteCounts[prevVote]);
                updateVoteCount(prevVote);
            }

            // Clear the user's vote from localStorage
            localStorage.removeItem('userVote');

            // Reset all vote counts and update the page
            teams.forEach((team) => {
                localStorage.setItem(`votes_${team}`, 0);
                voteCounts[team] = 0;
                updateVoteCount(team);
            });

            // Remove any visual cues for votes
            document.querySelectorAll(".vote-button").forEach((button) => {
                button.classList.remove("voted");
            });

            // Re-display the vote history
            displayVoteHistory();
        });
    }

    // Optional: Add a function to display the total number of votes across all teams
    function displayTotalVotes() {
        const totalVotesContainer = document.querySelector(".total-votes");
        if (totalVotesContainer) {
            const totalVotes = Object.values(voteCounts).reduce((acc, votes) => acc + votes, 0);
            totalVotesContainer.textContent = `Total Votes: ${totalVotes}`;
        }
    }

    // Display total votes
    displayTotalVotes();

    // Periodically update total votes (e.g., every 10 seconds)
    setInterval(displayTotalVotes, 10000);
});
