/**
 * Qwery SDK Types
 */

export type Network = 'solana' | 'solana-devnet';

export interface QweryConfig {
  /** Facilitator URL */
  facilitatorUrl: string;
  
  /** Default network */
  network?: Network;
  
  /** Request timeout in ms */
  timeout?: number;
}

export interface CreatePaymentRequest {
  /** User's wallet address */
  payer: string;
  
  /** Payment amount in lamports */
  amount: number;
  
  /** Network to use */
  network: Network;
  
  /** Optional merchant address */
  merchantAddress?: string;
  
  /** Optional merchant amount */
  merchantAmount?: number;
}

export interface CreatePaymentResponse {
  /** Partial-signed transaction (base64) */
  transaction: string;
  
  /** Whether user signature required */
  requires_user_signature: boolean;
  
  /** Payer address */
  payer: string;
  
  /** Payment amount */
  amount: number;
  
  /** Facilitator address */
  facilitator: string;
  
  /** Recent blockhash used */
  recent_blockhash: string;
}

export interface SettlePaymentRequest {
  /** Fully-signed transaction (base64) */
  signed_transaction: string;
  
  /** Network */
  network: Network;
  
  /** Optional merchant address */
  merchant_address?: string;
  
  /** Optional merchant amount */
  merchant_amount?: number;
}

export interface SettlePaymentResponse {
  /** Transaction signature */
  signature: string;
  
  /** Whether confirmed */
  confirmed: boolean;
  
  /** Network fee paid */
  network_fee: number;
  
  /** Slot number */
  slot: number;
  
  /** Merchant payout signature (if applicable) */
  merchant_signature?: string;
}

export interface UnlockContentOptions {
  /** Content amount in lamports */
  amount: number;
  
  /** Network to use */
  network?: Network;
  
  /** Optional merchant details */
  merchant?: {
    address: string;
    amount: number;
  };
}

export interface PaymentResult {
  /** Whether payment succeeded */
  success: boolean;
  
  /** Transaction signature */
  signature?: string;
  
  /** Error message if failed */
  error?: string;
  
  /** Full settlement response */
  settlement?: SettlePaymentResponse;
}

export interface CreatePaymentRequest {
  payer: string;
  amount: number;
  network: Network;
  token?: string;  // NEW: SOL, USDC, USDT
  merchantAddress?: string;
}

export interface UnlockContentOptions {
  amount: number;
  network?: Network;
  token?: string;  // NEW: SOL, USDC, USDT
  merchant?: {
    address: string;
    amount: number;
  };
}
