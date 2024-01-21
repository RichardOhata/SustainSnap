<script>
    let email= '';
    let password = '';
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            throw new Error('Login Failed');
        }
        const data = await response.json();
        console.log('Login Successful', data);
      } catch (error) {
        console.error('Error during login: ', error);
      }
    };
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <label>
      email:
      <input type="text" bind:value={email} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit">Login</button>
  </form>
  