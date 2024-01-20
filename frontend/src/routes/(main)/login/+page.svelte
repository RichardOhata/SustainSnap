<script>
    let username = '';
    let password = '';
  
    const handleLogin = () => {
      // Perform authentication logic here (e.g., send request to server)
      console.log('Logging in with:', { username, password });
    };
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <label>
      Username:
      <input type="text" bind:value={username} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit">Login</button>
  </form>
  