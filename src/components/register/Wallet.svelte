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
