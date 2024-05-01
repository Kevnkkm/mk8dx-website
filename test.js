fetch("https://mk8dx-yuzu.kevnkkm.de/api/leaderboard").then(response => response.json())
.then(data => {

    function sortByMMR(data) {
        // 1. Create a new array to store sorted objects
        const sortedData = [];
      
        // 2. Loop through the original data
        for (const item of data) {
          // 3. Find the appropriate insertion point in the sorted array
          let insertionIndex = 0;
          while (insertionIndex < sortedData.length && item.mmr >= sortedData[insertionIndex].mmr) {
            insertionIndex++;
          }
      
          // 4. Insert the object at the found position
          sortedData.splice(insertionIndex, 0, item);
        }
      
        // 5. Return the sorted array
        return sortedData;
      }
    
    const combinedData = data.map(player => ({
        name: player.name || player.Player,
        mmr: player.mmr || player.MMR,
        wins: player.wins || 0,
        losses: player.losses || 0
    }));


    console.log(sortByMMR(combinedData).reverse())

})