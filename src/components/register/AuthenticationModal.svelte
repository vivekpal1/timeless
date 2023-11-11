<script>
  import AuthButtons from './AuthButtons.svelte';
  let isModalOpen = false;

  function closeModal() {
    isModalOpen = false;
  }

  function handleBackdropClick(event) {
    if (event.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  }
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }
  
  .modal-content {
    position: relative;
    background-color: #4f4c5552;
    padding: 2rem;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
    z-index: 51;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .signup-btn {
    position: relative;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 0 1.5rem;
    margin-top: 2rem;
    background-color: transparent;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    color: #d2d6f5;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    border: none;
    transition: color 0.3s ease;
  }

  .signup-btn:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #4f435e;
    border-radius: 9999px;
    transition: transform 0.3s ease;
    z-index: 0;
  }

  .signup-btn:hover:before {
    transform: scale(1.05);
  }

  .signup-btn:active:before {
    transform: scale(0.95);
  }

  .signup-btn span {
    position: relative;
    z-index: 1;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
  }
</style>

<div class="text-center">
  <button class="signup-btn" on:click={() => isModalOpen = true}>
    <span>signup Now</span>
  </button>
</div>

{#if isModalOpen}
  <div class="modal-backdrop" on:click={handleBackdropClick}>
    <div class="modal-content">
      <button class="close-button" on:click={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="#d2d6f5" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Zm-2.83-7.17 5.66-5.66m0 5.66L9.17 9.17"/>
        </svg>        
      </button>
      <AuthButtons />
    </div>
  </div>
{/if}


