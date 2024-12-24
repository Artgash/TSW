document.addEventListener("DOMContentLoaded", () => {
    const teamVotes = JSON.parse(localStorage.getItem("teamVotes")) || {};
    const selectedTeam = localStorage.getItem("selectedTeam") || null;

    // Initialize teams and set up vote counts
    const teams = document.querySelectorAll('input[name="team"]');
    teams.forEach((team) => {
        const teamName = team.value;
        if (!teamVotes[teamName]) teamVotes[teamName] = 0;
    });

    // Display votes
    function displayVotes() {
        teams.forEach((team) => {
            const teamName = team.value;
            const voteCount = teamVotes[teamName];
            const voteDisplay = document.createElement("span");
            voteDisplay.classList.add("vote-count");
            voteDisplay.textContent = ` (${voteCount} votes)`;

            // Remove old vote count and re-add updated count
            if (team.nextElementSibling.nextElementSibling) {
                team.nextElementSibling.nextElementSibling.remove();
            }
            team.parentNode.appendChild(voteDisplay);
        });
    }

    // Highlight previously selected team
    if (selectedTeam) {
        const previousSelection = document.querySelector(`input[value="${selectedTeam}"]`);
        if (previousSelection) previousSelection.checked = true;
    }

    // Handle team selection and vote changes
    teams.forEach((team) => {
        team.addEventListener("change", () => {
            // Handle vote decrement for previous selection
            if (selectedTeam) {
                teamVotes[selectedTeam] = Math.max(0, teamVotes[selectedTeam] - 1);
            }

            // Handle vote increment for current selection
            const newSelection = team.value;
            teamVotes[newSelection] += 1;

            // Update selected team in localStorage
            localStorage.setItem("selectedTeam", newSelection);
            localStorage.setItem("teamVotes", JSON.stringify(teamVotes));

            // Update votes displayed
            displayVotes();
        });
    });

    // Initial display
    displayVotes();
});
