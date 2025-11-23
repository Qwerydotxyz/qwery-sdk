/**
 * @qwery/sdk
 * JavaScript SDK for Qwery x402 Payment Facilitator
 */

export { QweryPayment } from './QweryPayment';
export { connectWallet, getPhantomWallet } from './wallet';
export * from './types';

// Default export
import { QweryPayment } from './QweryPayment';
export default QweryPayment;
