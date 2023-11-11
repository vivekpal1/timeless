<script>
  import { onMount } from 'svelte';
  import { signInWithGoogle } from './firebase';
  import Wallet from './Wallet.svelte';

  async function handleGoogleSignIn() {
    try {
      const { user, token } = await signInWithGoogle();
      console.log(user, token);
      // handle successful sign in
    } catch (error) {
      console.error(error);
      // handle error
    }
  }

</script>

<button
  class="mt-2 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-700 hover:bg-yellow-800"
  on:click={handleGoogleSignIn}
>
  Sign in with Google
</button>
