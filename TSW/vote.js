document.addEventListener("DOMContentLoaded", () => {
    const voteButton = document.getElementById("submitVote");
    const voteMessage = document.getElementById("voteMessage");
    const votesList = document.getElementById("votesList");

    // All Teams (D1, D2, D3, D4)
    const teams = [
        "Argentina", "England", "Greece", "Ireland", "Japan", "Netherlands", 
        "Portugal", "Russia", "San Marino", "Vietnam", "Belgium", "Croatia", 
        "France", "Italy", "Mexico", "Norway", "South Korea", "Spain", 
        "Ukraine", "USA", "China", "Qatar", "India", "Morocco", "Canada", 
        "Germany", "Turkey", "Saudi Arabia", "Senegal", "North Korea", 
        "Serbia", "Brazil", "Australia", "Costa Rica", "South Africa", 
        "Colombia", "Iran", "Peru", "Uruguay", "Scotland", "China2", "Senegal2"
    ];

    // Initialize votes in localStorage
    function initializeVotes() {
        if (!localStorage.getItem("teamVotes")) {
            const votes = {};
            teams.forEach(team => votes[team] = 0);
            localStorage.setItem("teamVotes", JSON.stringify(votes));
        }
    }

    // Render votes dynamically
    function renderVotes() {
        const votes = JSON.parse(localStorage.getItem("teamVotes"));
        votesList.innerHTML = ""; // Clear the current list
        Object.keys(votes).forEach(team => {
            const li = document.createElement("li");
            li.textContent = `${team}: ${votes[team]} votes`;
            votesList.appendChild(li);
        });
    }

    // Submit Vote Handler
    voteButton.addEventListener("click", () => {
        const selectedTeam = document.querySelector("input[name='team']:checked");
        if (!selectedTeam) {
            voteMessage.textContent = "Please select a team to vote for!";
            return;
        }

        const userVoteKey = "userVote";
        const previousVote = localStorage.getItem(userVoteKey);

        if (previousVote) {
            voteMessage.textContent = "You have already voted! Changing votes is not allowed.";
            return;
        }

        const teamName = selectedTeam.value;
        const votes = JSON.parse(localStorage.getItem("teamVotes"));

        // Increment vote for the selected team
        votes[teamName] += 1;
        localStorage.setItem("teamVotes", JSON.stringify(votes));
        localStorage.setItem(userVoteKey, teamName);

        voteMessage.textContent = `Thank you for voting for ${teamName}!`;
        renderVotes();
    });

    // Initialize and render votes on page load
    initializeVotes();
    renderVotes();
});
