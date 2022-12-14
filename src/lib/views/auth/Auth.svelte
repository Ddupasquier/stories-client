<script lang="ts">
  import { supabase } from '$lib/supabase'

  let loading = false
  let email = ''

  const handleLogin = async () => {
    try {
      loading = true
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      console.log('logged in')
      loading = false
    }
  }
</script>


  <div class="login" aria-live="polite">
    <p class="description">Sign in via magic link with your email below</p>
    <form class="form-widget" on:submit|preventDefault="{handleLogin}">
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          class="inputField"
          type="email"
          placeholder="Your email"
          bind:value="{email}"
        />
      </div>
      <div>
        <button type="submit" class="button block" aria-live="polite" disabled="{loading}">
          <span>{loading ? 'Loading' : 'Send magic link'}</span>
        </button>
      </div>
    </form>
  </div>


<style lang='scss'>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      height: 100%;
    }
  }
</style>