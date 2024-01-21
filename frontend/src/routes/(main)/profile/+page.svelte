<script lang='ts'>
      let user = { 
        name: "John Doe",
        weeklyRank: 0,
        monthlyRank: 0,
        allTimeRank: 0,
        snapsTaken: 0,
        totalPoints: 0,
        startDate: "2024-01-20",
        imageUrl: "/blank.png"
    }
</script>

<style>
    .profile {
        max-width: 600px;
        width: 100%;
        text-align: center;
        margin: 0 auto;
        padding: 10px;
        background-color: #fff;
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
        margin-bottom: 10px;
        max-width: 350px;
        margin: auto;
        padding: 20px;
        align-items: center;
        justify-content: space-around;
        border: 1 px solid white;
        border-radius: 8px;
        background-color: forestgreen;
    }

    .bio {
        margin-top: 20px;
    }
</style>

<div class="profile">
    <h1>Me</h1>
    <img class="profile-image" src={user.imageUrl} alt="Profile">
    <p class="user-name">{user.name}</p>
    <p class="user-info">Weekly Rank: {user.weeklyRank}</p>
    <p class="user-info">Monthly Rank: {user.monthlyRank}</p>
    <p class="user-info"> All Time Rank: {user.allTimeRank}</p>
    <p class="user-info"> Snaps Taken: {user.snapsTaken}</p>
    <p class="user-info"> Total Points: {user.totalPoints}</p>
    <p class="user-info"> Start Date: {user.startDate}</p>
</div>