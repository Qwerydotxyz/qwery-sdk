/**
 * Qwery Payment SDK - Multi-Token Support
 */

import { Transaction } from '@solana/web3.js';
import {
  QweryConfig,
  CreatePaymentRequest,
  CreatePaymentResponse,
  SettlePaymentRequest,
  SettlePaymentResponse,
  UnlockContentOptions,
  PaymentResult,
  Network,
} from './types';
import { connectWallet, signTransaction } from './wallet';

export class QweryPayment {
  private facilitatorUrl: string;
  private defaultNetwork: Network;
  private timeout: number;

  constructor(config: QweryConfig) {
    this.facilitatorUrl = config.facilitatorUrl;
    this.defaultNetwork = config.network || 'solana';
    this.timeout = config.timeout || 30000;
  }

  async createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    const response = await fetch(`${this.facilitatorUrl}/create-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail?.error || 'Failed to create payment');
    }

    return await response.json();
  }

  async settlePayment(request: SettlePaymentRequest): Promise<SettlePaymentResponse> {
    const response = await fetch(`${this.facilitatorUrl}/settle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail?.error || 'Failed to settle payment');
    }

    return await response.json();
  }

  async unlockContent(options: UnlockContentOptions): Promise<PaymentResult> {
    try {
      const token = options.token || 'SOL';
      console.log(`🔓 Starting unlock process with ${token}...`);
      
      const wallet = await connectWallet();
      
      if (!wallet.publicKey) {
        throw new Error('Wallet connection failed');
      }
      
      const payerAddress = wallet.publicKey.toString();
      console.log(`✅ Wallet connected: ${payerAddress}`);

      console.log(`📝 Creating ${token} payment transaction...`);
      const payment = await this.createPayment({
        payer: payerAddress,
        amount: options.amount,
        network: options.network || this.defaultNetwork,
        token: token,
        merchantAddress: options.merchant?.address,
      });
      
      console.log(`✅ Payment created (Token: ${token})`);
      console.log('✅ Fee: 0 SOL - paid by facilitator');

      console.log('✍️  Please sign the transaction in your wallet...');
      const transactionBytes = Buffer.from(payment.transaction, 'base64');
      const transaction = Transaction.from(transactionBytes);
      
      const signedTransaction = await signTransaction(wallet, transaction);
      console.log('✅ Transaction signed by user');

      console.log('🚀 Submitting to blockchain...');
      const signedBytes = signedTransaction.serialize();
      const signedBase64 = Buffer.from(signedBytes).toString('base64');
      
      const settlement = await this.settlePayment({
        signed_transaction: signedBase64,
        network: options.network || this.defaultNetwork,
        merchant_address: options.merchant?.address,
        merchant_amount: options.merchant?.amount,
      });

      if (!settlement.confirmed) {
        throw new Error('Payment not confirmed on blockchain');
      }

      console.log('✅ Payment confirmed!');
      console.log(`   Signature: ${settlement.signature}`);
      console.log(`   Network fee: ${settlement.network_fee} lamports (paid by facilitator)`);
      console.log(`   Solscan: https://solscan.io/tx/${settlement.signature}`);

      return {
        success: true,
        signature: settlement.signature,
        settlement,
      };

    } catch (error) {
      console.error('❌ Payment failed:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.facilitatorUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  async getWalletStatus(network: Network = this.defaultNetwork): Promise<any> {
    const response = await fetch(
      `${this.facilitatorUrl}/wallet-status?network=${network}`
    );
    return await response.json();
  }
}
