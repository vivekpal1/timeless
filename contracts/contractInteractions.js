import Arweave from 'arweave';
import { SmartWeaveNodeFactory, LoggerFactory, RedstoneGatewayInteractionsLoader } from 'redstone-smartweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

LoggerFactory.INST.logLevel('error');

const smartweave = SmartWeaveNodeFactory.memCached(arweave);

export async function registerUserInContract(wallet, contractTxId, walletAddress) {
  const contract = smartweave.contract(contractTxId).connect(wallet);
  
  try {
    const interactionTxId = await contract.writeInteraction({
      function: 'registerUser',
      walletAddress
    });

    return interactionTxId;
  } catch (error) {
    console.error('Error interacting with the SmartWeave contract:', error);
    throw error;
  }
}

export async function unregisterUserFromContract(wallet, contractTxId, walletAddress) {
}

