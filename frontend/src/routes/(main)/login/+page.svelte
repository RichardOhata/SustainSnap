<script>
   import { goto } from "$app/navigation";
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

  <style>
    .login-container {
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
  
  <div class= "login-container">
    <form on:submit|preventDefault={handleLogin}>
      <label>
      Email:
      <input type="text" bind:value={email} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit">Log In</button>
  </form>
  </div>

  <div class ="create-account-container">
    <button on:click={() => goto('/signup')}> Don't have an account? Sign Up</button>
  </div>
  