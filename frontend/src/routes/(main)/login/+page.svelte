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
          if (response.status===400) {
            console.log(response);
          }
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
    }

    button {
        background-color: rgba(27, 49, 28, 1);
        color: #fff;
        padding: 10px;
        border: none;
        border-radius: 7px;
        cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    input {
      background: rgba(209, 238, 224, 1);
      width: 100%;
      height:7vh;
      border-radius: 7px;
      padding: 10px;
    }

    input::placeholder {
      color: black;
    }

  </style>
  <h1 class="text-center pt-5" style="font-weight: bold;">Login</h1>
  <div class= "login-container">
    <form on:submit|preventDefault={handleLogin}>
      
      <input type="email" placeholder="Email" required bind:value={email} />
      <br>
      <br>
      <input type="password" placeholder="Password" required bind:value={password} />
      <br>
      <br>  
      <div class=" flex flex-col items-center">
        <button type="submit" style="width: 100%;">Login</button>
      </div>
  </form>
  </div>  

  <div class ="create-account-container flex flex-col items-center">
    <p>Forgot Password?</p>
    <br>
    <br>
    <p style="color:#58b096"> Don't have an account? <a style="color:black" href="/#" on:click={() => goto('/signup')} >Sign Up</a></p>
  </div>
