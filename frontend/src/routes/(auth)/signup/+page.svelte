<script>
    import { goto } from "$app/navigation";
    import { signup } from "$lib/utils/signup.api"
    let username = '';
    let email = '';
    let password = '';
    let errorMsg = '';
    const handleSignup = async () => {
        try {
          const {data, response} = await signup(username, email, password);
        if (response.ok) {   
      console.log('Signup successful:', data);
      goto('/login');
    } else if (response.status === 400)
      {
            errorMsg = data.message;
            throw new Error('Signup failed');
        }
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
  }

  .create-account-container {
    max-width: 350px;
    margin: auto;
    padding: 15px;
    justify-content: center;
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

<h1 class="text-center pt-5" style="font-weight: bold;">Signup</h1>
<div class ="sign-up-container">
  <form on:submit|preventDefault={handleSignup}>
      <input type="text" placeholder= "Username" required bind:value={username} />
    <br>
    <br>
      <input type="email" placeholder="Email" required bind:value={email} />
      <br>
      <br>
      <input type="password" placeholder="Password" required bind:value={password} />
      <br>
      <br>
      <div class=" flex flex-col items-center">
    <button type="submit" style="width: 100%;">Signup</button>
  </form>
</div>

<div class ="create-account-container flex flex-col items-center">
<p style="color:#58b096"> Already have an account? <a style="color:black" href="#" on:click={() => goto('/login')} >Login</a></p> 
<p style="color: red;">{errorMsg}</p> 
</div>