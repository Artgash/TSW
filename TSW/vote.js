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

    const voteCounts = {};
    const userVotes = {};

    // Initialize vote counts from localStorage
    teams.forEach((team) => {
        const count = parseInt(localStorage.getItem(`votes_${team}`)) || 0;
        voteCounts[team] = count;
    });

    // Function to update the vote count on the page for each team
    function updateVoteCount(team) {
        const voteCountElement = document.querySelector(`.vote-count[data-team="${team}"]`);
        if (voteCountElement) {
            voteCountElement.textContent = voteCounts[team];
        }
    }

    // Function to handle voting
    function voteForTeam(team) {
        const prevVote = userVotes[localStorage.getItem("userId")];

        if (prevVote && prevVote !== team) {
            // Decrease the count for the previous vote
            voteCounts[prevVote] -= 1;
            localStorage.setItem(`votes_${prevVote}`, voteCounts[prevVote]);
            updateVoteCount(prevVote); // Update the previous team's vote count
        }

        // Increment the vote for the selected team
        voteCounts[team] += 1;
        localStorage.setItem(`votes_${team}`, voteCounts[team]);

        // Store the user's vote in userVotes object
        userVotes[localStorage.getItem("userId")] = team;

        // Update the displayed vote count for the selected team
        updateVoteCount(team);
    }

    // Initialize the page with the existing vote counts
    teams.forEach((team) => {
        updateVoteCount(team);
    });

    // Handle vote button clicks for each team
    document.querySelectorAll(".vote-button").forEach((button) => {
        button.addEventListener("click", function () {
            const team = this.getAttribute("data-team");

            // Vote for the team
            voteForTeam(team);

            // Store the user's vote locally (keep track of user session)
            const userId = localStorage.getItem("userId") || Math.random().toString(36).substring(2, 15);
            localStorage.setItem("userId", userId); // Save the user's unique session ID
        });
    });

    // Display real-time vote count for all teams
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

    // Display vote history for owner view
    if (localStorage.getItem("isOwner") === "true") {
        setInterval(displayVoteHistory, 5000);  // Update the owner view every 5 seconds
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

    // Periodically update total votes (every 10 seconds)
    setInterval(displayTotalVotes, 10000);
    
    // Reset votes button (if needed)
    const resetButton = document.querySelector(".reset-vote");
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            // Reset the user vote
            const userId = localStorage.getItem("userId");
            if (userId && userVotes[userId]) {
                const prevVote = userVotes[userId];
                voteCounts[prevVote] -= 1;
                localStorage.setItem(`votes_${prevVote}`, voteCounts[prevVote]);
                updateVoteCount(prevVote);
            }

            // Clear user vote and reset all votes
            localStorage.removeItem("userVote");
            localStorage.removeItem("userId");

            teams.forEach((team) => {
                voteCounts[team] = 0;
                localStorage.setItem(`votes_${team}`, 0);
                updateVoteCount(team);
            });

            displayTotalVotes();  // Update the total votes display
        });
    }

});
