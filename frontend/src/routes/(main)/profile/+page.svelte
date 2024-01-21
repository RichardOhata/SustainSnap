<script lang='ts'>
      let user = { 
        name: "John Doe",
        weeklyRank: 0,
        monthlyRank: 0,
        allTimeRank: 0,
        snapsTaken: 0,
        totalPoints: 0,
        startDate: 0,
        imageUrl: "/blank.png"
    }
</script>

<style>
    .profile {
        max-width: 600px;
        width: 100%;
        text-align: center;
        margin: 0 auto;
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
        font-size: 0.6rem;
        margin-bottom: 10px;
    }

    .bio {
        margin-top: 20px;
    }
</style>

<div class="profile">
    <h1>Me</h1>
    <img class="profile-image" src={user.imageUrl} alt="Profile">
    <p class="user-name">{user.name}</p>
    <p class="user-info">Weekly Rank {user.weeklyRank}</p>
    <p class="user-info">Monthly Rank {user.monthlyRank}</p>
    <p class="user-info"> All Time Rank {user.allTimeRank}</p>
    <p class="user-info"> Snaps Taken {user.snapsTaken}</p>
    <p class="user-info"> Total Points {user.totalPoints}</p>
    <p class="user-info"> Start Date {user.startDate}</p>
</div>