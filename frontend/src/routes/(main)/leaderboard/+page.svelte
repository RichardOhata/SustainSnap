<script lang='ts'>
    let user = { 
      name: "John Doe",
      weeklyRank: 0,
      monthlyRank: 0,
      allTimeRank: 0,
      snapsTaken: 0,
      totalPoints: 0,
      startDate: "2024-01-20",
      imageUrl: "/trophy.png"
  }
</script>

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
      background-color: rgba(40,60,36);
  }

  .leaderboard-header {
      font-size: 1.5rem;
      color: white;
      font-weight: bold;
  }

</style>

<div class="leaderboard">
  <h1 class="leaderboard-header">Leaderboard</h1>
  <img class="trophy" src={user.imageUrl} alt="trophy">
  <p class="leaderboard-entry">1. Jane Doe &nbsp; &nbsp; &nbsp; 1000000</p>
  <br>
  <p class="leaderboard-entry">2. Jane Doe &nbsp; &nbsp; &nbsp; 750000</p>
  <br>
  <p class="leaderboard-entry">3. Jane Doe &nbsp; &nbsp; &nbsp; &nbsp; 650000</p>
  <br>
  <p class="leaderboard-entry">4. Jane Doe &nbsp; &nbsp; &nbsp; 500000</p>
  <br>
  <p class="leaderboard-entry">5. Jane Doe &nbsp; &nbsp; &nbsp; 350000</p>
  <br>
  <p class="leaderboard-entry">6. Jane Doe &nbsp; &nbsp; &nbsp; 150000</p>
</div>
