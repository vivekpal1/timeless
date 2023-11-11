<script>
  import { ArweaveWebWallet } from "arweave-wallet-connector";

  let wallet = new ArweaveWebWallet({ name: "svelte-app" });

  const connect = async () => {
    try {
      await wallet.connect();
      console.log('Connected:', wallet);
    } catch (error) {
      console.error('Error connecting to Arweave wallet:', error);
    }
  };

  const disconnect = async () => {
    try {
      await wallet.disconnect();
      console.log('Disconnected');
    } catch (error) {
      console.error('Error disconnecting from Arweave wallet:', error);
    }
  };
</script>

<button on:click={connect}>Connect</button>
