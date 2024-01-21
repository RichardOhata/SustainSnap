<script>
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
      throw new Error('Signup failed');
    }

    const data = await response.json();
    console.log('Signup successful:', data);
  } catch (error) {
    console.error('Error during signup:', error);
  }
    }
  
 
  </script>
  
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
  