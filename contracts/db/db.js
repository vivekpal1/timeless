import WeaveDB from 'weavedb-sdk';

const db = new WeaveDB({ contractTxId: 'nRAeYRmZnezwsz4J9UQ__DocaZuqqtplLiVA89tUN7w' });

export async function registerUser(state, walletAddress) {
  try {
    await db.init();
    const txId = await db.set({ walletAddress }, 'users', walletAddress);
    // Update state with the new user
    const newState = {
      ...state,
      users: {
        ...state.users,
        [walletAddress]: { txId, registeredAt: Date.now() }
      }
    };
    return { state: newState };
  } catch (error) {
    throw new Error('Failed to register user: ' + error.message);
  }
}

export async function handle(state, action) {
  const input = action.input;
  const caller = action.caller;

  switch (input.function) {
    case 'registerUser':
      if (!input.walletAddress) {
        throw new Error('walletAddress is required.');
      }
      if (state.users[input.walletAddress]) {
        throw new Error('User is already registered.');
      }
      state.users[input.walletAddress] = {
        walletAddress: input.walletAddress,
        timestamp: Date.now(),
      };
      break;

    default:
      throw new Error(`No function supplied or function not recognized: ${input.function}`);
  }

  return { state };
}

