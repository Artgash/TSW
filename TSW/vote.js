document.addEventListener("DOMContentLoaded", function () {
    const voteButton = document.getElementById("submitVote");
    const voteMessage = document.getElementById("voteMessage");
    const votesList = document.getElementById("votesList");

    // Extract team names dynamically from the DOM
    function getTeamNames() {
        const teamInputs = document.querySelectorAll("input[name='team']");
        const teams = {};
        teamInputs.forEach(input => {
            const teamName = input.value;
            teams[teamName] = 0; // Initialize vote count to 0
        });
        return teams;
    }

    // Initialize votes in localStorage if not already done
    function initializeVotes() {
        if (!localStorage.getItem("teamVotes")) {
            const votes = getTeamNames();
            localStorage.setItem("teamVotes", JSON.stringify(votes));
            console.log("Votes initialized:", votes);
        }
    }

    // Render votes in the UI
    function renderVotes() {
        const votes = JSON.parse(localStorage.getItem("teamVotes"));
        votesList.innerHTML = ""; // Clear the current list
        Object.keys(votes).forEach(team => {
            const li = document.createElement("li");
            li.textContent = `${team}: ${votes[team]} votes`;
            votesList.appendChild(li);
        });
    }

    // Handle vote submission
    voteButton.addEventListener("click", function () {
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

        const votes = JSON.parse(localStorage.getItem("teamVotes"));
        const teamName = selectedTeam.value;

        // Increment the vote
        votes[teamName] += 1;
        localStorage.setItem("teamVotes", JSON.stringify(votes));
        localStorage.setItem(userVoteKey, teamName);

        voteMessage.textContent = `Thank you for voting for ${teamName}!`;
        renderVotes();
    });

    // Initialize and render votes
    initializeVotes();
    renderVotes();

    // Attach the inspectVotes function to the window object for debugging
    window.inspectVotes = function () {
        const votes = JSON.parse(localStorage.getItem("teamVotes"));
        console.log("Inspecting votes:", votes);
        return votes;
    };

    console.log("You can use `inspectVotes()` in the console to view vote results.");
});
