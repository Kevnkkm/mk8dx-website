const url = 'https://mk8dx-yuzu.kevnkkm.de/api/leaderboard'

document.addEventListener("DOMContentLoaded", function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader-container').style.display = 'none';
            
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
           document.getElementById('loader-container').style.display = 'none';
           document.getElementById('api-error').style.display = 'flex';
        });
});



const downloadButton = document.getElementsByClassName('download-div')[0];

downloadButton.addEventListener('click', async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();

    let date = new Date()

    const filename = `leaderboard-${date.toISOString().split('T')[0]}.json`;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

    if (window.navigator.webkitURL) { // Chrome and Safari
      const link = document.createElement('a');
      link.href = window.navigator.webkitURL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else { // Firefox
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  } catch (error) {
    console.error('Error downloading JSON:', error);
  }
});