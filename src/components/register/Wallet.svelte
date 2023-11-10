<!-- Wallet.svelte -->
<script>
  import { onMount, writable } from 'svelte/store';

  // Initialize a writable store to manage the state of the wallet connection.
  const walletState = writable({ connected: false, address: null });

  // Declare a variable to hold the wallet instance.
  let wallet;

  // Use the onMount hook for client-side-only execution.
  onMount(() => {
    // Dynamically import the ArweaveWebWallet module to avoid SSR issues.
    import("arweave-wallet-connector").then(({ ArweaveWebWallet }) => {
      // Create a new instance of ArweaveWebWallet.
      wallet = new ArweaveWebWallet({ name: "svelte-app" });

      // Now you can use `wallet` as it will be executed only on the client-side.
      // For example, to connect:
      // wallet.connect();
    });
  });

  // Define the connect function to initiate the connection.
  const connect = async () => {
    try {
      await wallet.connect();
      const address = await wallet.getActiveAddress();
      walletState.set({ connected: true, address });
    } catch (error) {
      console.error('Error connecting to Arweave wallet:', error);
    }
  };

  // Define the disconnect function to terminate the connection.
  const disconnect = async () => {
    try {
      await wallet.disconnect();
      walletState.set({ connected: false, address: null });
    } catch (error) {
      console.error('Error disconnecting from Arweave wallet:', error);
    }
  };
</script>

<!-- Subscribe to the Svelte store using the $ prefix -->
{#if $walletState.connected}
  <button on:click={disconnect}>Disconnect</button>
  <div style="margin-top: 10px;">
    Connected address: <span style="color:green;">{$walletState.address}</span>
  </div>
{:else}
  <button on:click={connect}>Connect</button>
{/if}
