document.addEventListener("DOMContentLoaded", function () {
    fetch('http://3.70.233.81:5000/api/leaderboard')
        .then(response => response.json())
        .then(data => {
            // Sort data by MMR descending
            data.sort((a, b) => b.mmr - a.mmr);

            const leaderboardBody = document.getElementById('leaderboard-body');

            // Clear existing rows (if any)
            leaderboardBody.innerHTML = '';

            // Iterate through data to create table rows
            data.forEach((player, index) => {
                const rank = index + 1; // Calculate rank
                const row = `
                    <tr>
                        <td>${rank}</td>
                        <td>${player.name}</td>
                        <td>${player.mmr}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                    </tr>
                `;
                leaderboardBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
});
