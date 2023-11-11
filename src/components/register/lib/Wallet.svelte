<script>
  import { ArweaveWebWallet } from "arweave-wallet-connector";
  const state = { url: "arweave.app" };
  let wallet = new ArweaveWebWallet({ name: "svelte" }, { state });

  const connect = async () => {
    console.log(wallet.url);
    wallet.setUrl(wallet.url ?? state.url);
    await wallet.connect();
  };

  const disconnect = async () => {
    await wallet.disconnect();
  };

  console.log($wallet.connected);
</script>

{#if $wallet.connected}
  <button on:click={disconnect}> Disconnect </button>

  <div style="margin-top: 10px;">
    Connected address: <span style="color:green;">{$wallet.address}</span>
  </div>
{:else}
  <button on:click={connect}> Connect </button>
{/if}
