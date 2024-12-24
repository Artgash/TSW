document.addEventListener("DOMContentLoaded", () => {
    const teamVotes = JSON.parse(localStorage.getItem("teamVotes")) || {};
    const selectedTeam = localStorage.getItem("selectedTeam") || null;

    // Display votes for each team
    function displayVotes() {
        const allTeams = document.querySelectorAll('input[name="team"]');
        allTeams.forEach((team) => {
            const voteCount = teamVotes[team.value] || 0;
            const voteDisplay = document.createElement("span");
            voteDisplay.classList.add("vote-count");
            voteDisplay.style.marginLeft = "10px";
            voteDisplay.style.color = "#bf0a30";
            voteDisplay.textContent = `(${voteCount} votes)`;

            // Remove old vote count if it exists
            if (team.nextSibling.nextSibling) {
                team.nextSibling.nextSibling.remove();
            }

            team.parentNode.appendChild(voteDisplay);
        });
    }

    // Highlight previously selected team
    if (selectedTeam) {
        const selectedInput = document.querySelector(`input[value="${selectedTeam}"]`);
        if (selectedInput) selectedInput.checked = true;
    }

    // Handle vote submission
    const allTeams = document.querySelectorAll('input[name="team"]');
    allTeams.forEach((team) => {
        team.addEventListener("change", () => {
            // Decrement vote of previously selected team
            if (selectedTeam) {
                teamVotes[selectedTeam] = (teamVotes[selectedTeam] || 1) - 1;
                if (teamVotes[selectedTeam] < 0) teamVotes[selectedTeam] = 0;
            }

            // Update selected team
            const newSelectedTeam = team.value;
            localStorage.setItem("selectedTeam", newSelectedTeam);

            // Increment vote of newly selected team
            teamVotes[newSelectedTeam] = (teamVotes[newSelectedTeam] || 0) + 1;
            localStorage.setItem("teamVotes", JSON.stringify(teamVotes));

            // Update displayed votes
            displayVotes();
        });
    });

    // Initial vote display
    displayVotes();
});
