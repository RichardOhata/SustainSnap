<script lang='ts'>
    let user = { 
      name: "John Doe",
      weeklyRank: 1,
      monthlyRank: 22,
      allTimeRank: 112,
      snapsTaken: 100,
      totalPoints: 450000,
      startDate: "2024-01-20",
      imageUrl: "/blank.png"
  }
</script>

<style>
  .profile {
      max-width: 100%;
      text-align: center;
      margin: 0 auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      text-align: center;
  }

  .profile-image {
      width: 15%;
      margin: 0 auto;
  }
  
  .user-name {
      font-size: 1rem;
      margin-bottom: 10px;
  }
  .user-info {
      display: flex;
      font-size: 0.9rem;
      color: grey;
      margin-bottom: 10px;
      max-width: 350px;
      margin: auto;
      padding: 20px;
      align-items: center;
      justify-content: space-around;
      border: 1 px solid white;
      border-radius: 8px;
  }

  .divider {
  border-top: 1px solid #ccc;
  margin-top: 5px; /* Adjust margin as needed */
  margin-bottom: 5px; /* Adjust margin as needed */
}

  .bio {
      margin-top: 20px;
  }

  .me {
      font-size: 1.4rem;
      color: grey;
      font-weight: bold;
  }

  .name {
      font-size: 0.8rem;
      color: grey;
      font-weight: 600;
  }
</style>

<div class="profile">
  <h1 class="me">Me</h1>
  <img class="profile-image" src={user.imageUrl} alt="Profile">
  <p class="name">{user.name}</p>
  <p class="user-info">
      Weekly Rank {user.weeklyRank}</p>
  <p class="user-info">Monthly Rank {user.monthlyRank}</p>
  <p class="user-info"> All Time Rank {user.allTimeRank}</p>
  <div class="divider"></div>
  <p class="user-info"> Snaps Taken {user.snapsTaken}</p>
  <p class="user-info"> Total Points {user.totalPoints}</p>
  <p class="user-info"> Start Date {user.startDate}</p>
</div>
