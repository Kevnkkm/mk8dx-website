document.addEventListener("DOMContentLoaded", function () {
    const url = 'https://mk8dx-yuzu.kevnkkm.de/api/leaderboard'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Combine players with different attribute names into a single structure
            const combinedData = data.map(player => ({
                name: player.name || player.Player,
                mmr: player.mmr || player.MMR,
                wins: player.wins || 0,
                losses: player.losses || 0
            }));

            // Sort data by MMR descending
            combinedData.sort((a, b) => b.mmr - a.mmr);

            const leaderboardBody = document.getElementById('leaderboard-body');

            // Iterate through data to create table rows
            combinedData.forEach((player, index) => {
                const rank = index + 1; // Calculate rank

                // Determine color class based on MMR range
                let colorClass = '';
                if (player.mmr >= 0 && player.mmr <= 1400) {
                    colorClass = 'rank09bronze';
                } else if (player.mmr >= 1500 && player.mmr <= 2900) {
                    colorClass = 'rank08silver';
                } else if (player.mmr >= 3000 && player.mmr <= 5000) {
                    colorClass = 'rank07gold';
                } else if (player.mmr >= 5100 && player.mmr <= 6900) {
                    colorClass = 'rank06platinum';
                } else if (player.mmr >= 7000 && player.mmr <= 9400) {
                    colorClass = 'rank03diamond';
                } else if (player.mmr >= 9500) {
                    colorClass = 'rank02master';
                }

                // Check if player object contains all necessary fields
                if (player.name && player.mmr && player.wins !== undefined && player.losses !== undefined) {
                    const row = `
                        <tr class="${colorClass}">
                            <td>${rank}</td>
                            <td>${player.name}</td>
                            <td>${player.mmr}</td>
                            <td>${player.wins}</td>
                            <td>${player.losses}</td>
                        </tr>
                    `;
                    leaderboardBody.innerHTML += row;
                }
            });
        })
        .catch(error => {
           console.error('Error fetching leaderboard:', error);
           document.getElementById('api-error').style.display = 'flex';
        });
});
