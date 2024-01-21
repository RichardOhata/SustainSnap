<script>
    import { goto } from "$app/navigation";
    let username = '';
    let email = '';
    let password = '';
  
    const handleSignup = async () => {
        try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password}),
    });

    if (!response.ok) {
        if (response.status === 400) {
            console.log(response);
        }
      throw new Error('Signup failed');
    }

    const data = await response.json();
    console.log('Signup successful:', data);
    goto('/login');
  } catch (error) {
    console.error('Error during signup:', error);
  }
    }
  
 
  </script>

<style>
  .sign-up-container {
    max-width: 350px;
    margin: auto;
    padding: 55px;
    justify-content: center;
    align-items: center;
    border: 1 px solid whitesmoke;
    border-radius: 8px;
    background-color: whitesmoke;
  }

  .create-account-container {
    max-width: 350px;
    margin: auto;
    padding: 15px;
    justify-content: center;
    border: 1 px solid whitesmoke;
    border-radius: 8px;
    background-color: whitesmoke;
  }

  button {
      background-color: #4caf50;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

</style>

<div class ="sign-up-container">
  <form on:submit|preventDefault={handleSignup}>
    <label>
      Username:
      <input type="text" bind:value={username} />
    </label>
    <label>
      Email:
      <input type="email" bind:value={email} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit">Signup</button>
  </form>
</div>