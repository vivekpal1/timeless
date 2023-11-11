<script>
  import AuthButtons from './AuthButtons.svelte';
  import Wallet from './Wallet.svelte'
  let isModalOpen = false;
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .modal-content {
    background-color: rgb(0, 0, 0);
    padding: 2rem;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
    z-index: 51;
  }
  
  .button {
    margin-top: 1rem;
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .button-primary {
    background-color: #646cff;
    color: white;
  }

  .button-secondary {
    background-color: #f3f3f3;
    color: #333;
  }
</style>

<div class="text-center">
  <button
    class="button button-primary"
    on:click={() => isModalOpen = true}
  >
    Register Now
  </button>
</div>

{#if isModalOpen}
  <div class="modal-backdrop">
    <div class="modal-content">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sign in to Timeless</h3>
      <AuthButtons />
      
      <button 
        class="button button-secondary"
        on:click={() => isModalOpen = false}
      >
        Cancel
      </button>
    </div>
  </div>
{/if}
