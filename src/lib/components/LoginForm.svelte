<!-- create simple login form for username and password as well as google authentication -->
<script lang='ts'>
      // import { login } from '$lib/api/apiPost';
      // import { user } from '$lib/stores/userStore';
      import { goto } from '$app/navigation';
      import { onMount } from 'svelte';
      import {initializeApp, getApps, getApp} from 'firebase/app';
      // import {signInWithPopup, GoogleAuthProvider} from 'firebase/app';

      let username: string;
      let password: string;

      const submit = async () => {
            // const response = await login(username, password);
            // if (response) {
            //       user.set(response);
            //       goto('/home');
            // }
      };

      const googleLogin = async () => {
            // const response = await loginWithGoogle();
            // if (response) {
            //       user.set(response);
            //       goto('/home');
            // }
      };

      // onMount(() => {
      //       if (user) {
      //             goto('/home');
      //       }
      // });
</script>

<h1>Login</h1>
<form on:submit|preventDefault={submit}>
      <label for='username'>Username</label>
      <input type='text' id='username' bind:value={username} />
      <label for='password'>Password</label>
      <input type='password' id='password' bind:value={password} />
      <button type='submit'>Login</button>
</form>
<!-- google login -->
<button on:click={googleLogin}>Login with Google</button>


<style lang='scss'>
      form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
      }

      label {
            margin: 0.5rem;
      }

      input {
            margin: 0.5rem;
      }

      button {
            margin: 0.5rem;
      }
</style>