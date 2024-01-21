<script>
  import { onMount } from "svelte";

  let user = {
    name: "John Doe",
    weeklyRank: 0,
    monthlyRank: 0,
    allTimeRank: 0,
    snapsTaken: 0,
    totalPoints: 0,
    startDate: "2024-01-20",
    imageUrl: "/trophy.png",
  };

  let scores = [];
  onMount(() => {
    fetch(`${import.meta.env.VITE_SERVER_ADDR}/get_leaderboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        scores = data.sort((a, b) => b.score - a.score);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching entries:", error);
      });
  });
</script>

<div class="leaderboard">
  <h1 class="leaderboard-header">Leaderboard</h1>
  <img class="trophy" src={user.imageUrl} alt="trophy" />
  {#each scores as { username, score }, index (index + 1)}
    <div>
      <p class="leaderboard-entry">
        {index + 1}. {username} &nbsp; &nbsp; &nbsp; {score}
      </p>
    </div>
    <br />
  {/each}
</div>

<style>
  .leaderboard {
    max-width: 100%;
    text-align: center;
    margin: 0 auto;
    padding: 3px;
    background-color: #1b3a0d;
    text-align: center;
  }

  .trophy {
    width: 15%;
    margin: 0 auto;
    padding: 5px;
  }

  .leaderboard-entry {
    display: flex;
    font-size: 0.9rem;
    color: white;
    margin-bottom: 10px;
    max-width: 500px;
    margin: auto;
    padding: 25px;
    align-items: center;
    justify-content: space-around;
    border: 1 px solid white;
    border-radius: 8px;
    background-color: rgba(40, 60, 36);
  }

  .leaderboard-header {
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
  }
</style>
