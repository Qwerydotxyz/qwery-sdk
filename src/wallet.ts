/**
 * Wallet Connection Utilities
 */

import { Transaction } from '@solana/web3.js';

export interface WalletAdapter {
  publicKey: { toString(): string } | null;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

/**
 * Get connected Phantom wallet
 */
export async function getPhantomWallet(): Promise<WalletAdapter | null> {
  if (typeof window === 'undefined') {
    throw new Error('Wallet only available in browser');
  }
  
  const phantom = (window as any).solana;
  
  if (!phantom?.isPhantom) {
    throw new Error('Phantom wallet not found. Please install Phantom.');
  }
  
  return phantom;
}

/**
 * Connect to wallet
 */
export async function connectWallet(): Promise<WalletAdapter> {
  const wallet = await getPhantomWallet();
  
  if (!wallet) {
    throw new Error('No wallet found');
  }
  
  // Connect if not already connected
  if (!wallet.publicKey) {
    await wallet.connect();
  }
  
  return wallet;
}

/**
 * Sign transaction with wallet
 */
export async function signTransaction(
  wallet: WalletAdapter,
  transaction: Transaction
): Promise<Transaction> {
  if (!wallet.publicKey) {
    throw new Error('Wallet not connected');
  }
  
  return await wallet.signTransaction(transaction);
}
