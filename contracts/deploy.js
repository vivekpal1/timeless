// deploy.js
import { WarpFactory, LoggerFactory } from 'warp-contracts';
import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const environment = process.env.WARPENV || 'mainnet';
let warp;

if (environment === 'testnet') {
  warp = WarpFactory.forTestnet().use(new DeployPlugin());
} else if (environment === 'mainnet') {
  warp = WarpFactory.forMainnet().use(new DeployPlugin());
} else {
  throw Error('Environment not set properly...');
}

async function configureWallet() {
  try {
    const walletPath = environment === 'testnet' ? '../walletkey.json' : '../walletkey.json';
    const walletJson = fs.readFileSync(path.resolve(__dirname, walletPath), 'utf-8');
    const walletObject = JSON.parse(walletJson);
    return new ArweaveSigner(walletObject);
  } catch (err) {
    throw new Error('Error configuring wallet:', err);
  }
}

async function deploy() {
    const wallet = await configureWallet();
  
    const contractSourcePath = path.join(__dirname, './db/db.js');
    const initialStatePath = path.join(__dirname, './db/initialState.json');
  
    const contractSource = fs.readFileSync(contractSourcePath, 'utf-8');
    const initialState = fs.readFileSync(initialStatePath, 'utf-8');
  
    LoggerFactory.INST.logLevel('error');
  
    const { contractTxId } = await warp.createContract.deploy({
      wallet,
      initState: initialState,
      src: contractSource,
    });
  
    console.log('Contract deployed with TXID:', contractTxId);
  }
  
  deploy();
