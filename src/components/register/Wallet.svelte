<script>
  import { writable } from 'svelte/store';
  import { ArweaveWebWallet } from 'arweave-wallet-connector';

  export const walletAddress = writable(null); // Export a writable store
  const state = { url: 'arweave.app' };
  let wallet = new ArweaveWebWallet({ name: 'svelte' }, { state });

  const connect = async () => {
    try {
      console.log(wallet.url);
      wallet.setUrl(wallet.url ?? state.url);
      await wallet.connect();
      walletAddress.set(wallet.activeAddress); // Update the store with the wallet address
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const disconnect = async () => {
    try {
      await wallet.disconnect();
      walletAddress.set(null); // Clear the wallet address in the store
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  console.log($wallet.connected);
</script>


<style>
  button {
    padding: 0.6em 1.2em;
    border: none;
    background-color: #857cb8;
    color: rgba(255, 255, 255, 0.849);
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #5a4f97;
  }

  .connected-info {
    margin-top: 10px;
    color: #ffffff;
  }

  .connected-address {
    color: rgb(255, 255, 255);
  }
</style>

{#if $wallet.connected}
  <button on:click={disconnect}> Disconnect </button>

  <div style="margin-top: 10px;">
    Connected address: <span style="color:green;">{$wallet.address}</span>
  </div>
{:else}
  <button on:click={connect}> Connect Wallet </button>
{/if}
