const fs = require("fs");
const path = require("path");

// File Path
const TEAMS_FILE = path.join(__dirname, "teams.txt");

// All Teams (D1, D2, D3, D4)
const teams = [
    "Argentina", "England", "Greece", "Ireland", "Japan", "Netherlands", "Portugal", "Russia", "San Marino", "Vietnam",
    "Belgium", "Croatia", "France", "Italy", "Mexico", "Norway", "South Korea", "Spain", "Ukraine", "USA",
    "China", "Qatar", "India", "Morocco", "Canada", "Germany", "Turkey", "Saudi Arabia", "Senegal", "North Korea", "Serbia", "Brazil",
    "Australia", "Costa Rica", "South Africa", "Colombia", "Iran", "Peru", "Uruguay", "Scotland", "China2", "Senegal2"
];

// Initialize the teams.txt file
function initializeTeamsFile() {
    if (!fs.existsSync(TEAMS_FILE)) {
        const content = teams
            .map(team => `Team: ${team}\nVotes: 0\nVoters:\n`)
            .join("\n");
        fs.writeFileSync(TEAMS_FILE, content, "utf8");
        console.log("Teams file initialized.");
    } else {
        console.log("Teams file already exists.");
    }
}

// Read the team data from teams.txt
function readTeamsData() {
    const fileContent = fs.readFileSync(TEAMS_FILE, "utf8");
    const teamBlocks = fileContent.trim().split("\n\n"); // Split by paragraphs
    return teamBlocks.map(block => {
        const lines = block.split("\n");
        const teamName = lines[0].split(": ")[1];
        const votes = parseInt(lines[1].split(": ")[1], 10);
        const voters = lines.slice(2).join("\n").replace("Voters:\n", "").split("\n").filter(Boolean);
        return { teamName, votes, voters };
    });
}

// Save updated team data to teams.txt
function saveTeamsData(data) {
    const content = data
        .map(
            team =>
                `Team: ${team.teamName}\nVotes: ${team.votes}\nVoters:\n${team.voters.join("\n")}`
        )
        .join("\n\n");
    fs.writeFileSync(TEAMS_FILE, content, "utf8");
}

// Cast a vote for a team
function castVote(teamName, voter) {
    const teamsData = readTeamsData();
    const team = teamsData.find(t => t.teamName === teamName);

    if (!team) {
        console.error(`Team "${teamName}" does not exist.`);
        return;
    }

    if (team.voters.includes(voter)) {
        console.log(`Voter "${voter}" has already voted for "${teamName}".`);
        return;
    }

    // Update votes and add the voter
    team.votes += 1;
    team.voters.push(voter);

    // Save updated data
    saveTeamsData(teamsData);
    console.log(`Vote cast successfully! "${teamName}" now has ${team.votes} votes.`);
}

// Display all team votes
function displayVotes() {
    const teamsData = readTeamsData();
    console.log("\nTeam Vote Summary:");
    teamsData.forEach(team => {
        console.log(`${team.teamName}: ${team.votes} votes`);
    });
}

// Main Function
function main() {
    initializeTeamsFile();

    // Example Voting
    castVote("Argentina", "user1");
    castVote("Brazil", "user2");
    castVote("Germany", "user3");
    castVote("Argentina", "user4");
    castVote("Argentina", "user1"); // Duplicate voter example

    displayVotes();
}

main();
