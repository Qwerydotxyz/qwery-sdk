<div align="center">
  <img src="https://res.cloudinary.com/dkfwg4ta8/image/upload/v1763919238/sdk_banner_oq2ed9.png" alt="Qwery SDK Banner" width="100%" />
</div>

# Qwery SDK

TypeScript SDK for integrating Qwery x402 Payment Facilitator into your applications.

## Installation
```bash
npm install @qwery/sdk
# or
yarn add @qwery/sdk
# or
pnpm add @qwery/sdk
```

## Quick Start
```typescript
import { QweryPayment } from '@qwery/sdk';

const qwery = new QweryPayment({
  facilitatorUrl: 'https://facilitator.qwery.xyz',
  network: 'solana' // or 'solana-devnet'
});

// Create payment
const payment = await qwery.createPayment({
  amount: 0.01,
  token: 'SOL',
  recipient: 'merchant_wallet_address'
});

// Sign and settle
await qwery.signAndSettle(payment, userWallet);
```

## Features

- 🚀 Zero user fees (facilitator pays network fees)
- ⚡ Instant settlement (<2 seconds)
- 💰 Multi-token support (SOL, USDC, USDT)
- 🔒 Type-safe TypeScript API
- 📦 Tree-shakeable ESM build
- 🌐 Works in browser and Node.js

## API Reference

### Initialize Client
```typescript
import { QweryPayment } from '@qwery/sdk';

const qwery = new QweryPayment({
  facilitatorUrl: 'https://facilitator.qwery.xyz',
  network: 'solana', // 'solana' or 'solana-devnet'
  apiKey?: 'your_api_key' // Optional
});
```

### Create Payment
```typescript
const payment = await qwery.createPayment({
  amount: 0.01,          // Amount in token
  token: 'SOL',          // 'SOL', 'USDC', or 'USDT'
  recipient: 'wallet',   // Merchant wallet address
  metadata?: {}          // Optional metadata
});
```

### Sign and Settle Transaction
```typescript
// With Phantom/Solflare wallet
await qwery.signAndSettle(payment, window.solana);

// With keypair
import { Keypair } from '@solana/web3.js';
const wallet = Keypair.fromSecretKey(secretKey);
await qwery.signAndSettle(payment, wallet);
```

### Verify Payment
```typescript
const result = await qwery.verifyPayment({
  transactionSignature: 'signature',
  network: 'solana'
});

console.log(result.verified); // true/false
```

## Examples

### Browser Integration
```typescript
import { QweryPayment } from '@qwery/sdk';

const qwery = new QweryPayment({
  facilitatorUrl: 'https://facilitator.qwery.xyz',
  network: 'solana'
});

async function payWithPhantom() {
  // Check if Phantom is installed
  if (!window.solana?.isPhantom) {
    alert('Please install Phantom wallet');
    return;
  }

  // Connect wallet
  await window.solana.connect();

  // Create payment
  const payment = await qwery.createPayment({
    amount: 0.01,
    token: 'SOL',
    recipient: 'merchant_wallet_address'
  });

  // Sign and settle
  const result = await qwery.signAndSettle(payment, window.solana);
  
  console.log('Payment successful!', result);
}
```

### Node.js Backend
```typescript
import { QweryPayment } from '@qwery/sdk';
import { Keypair } from '@solana/web3.js';

const qwery = new QweryPayment({
  facilitatorUrl: 'https://facilitator.qwery.xyz',
  network: 'solana'
});

// Load wallet from environment
const wallet = Keypair.fromSecretKey(
  Buffer.from(process.env.WALLET_SECRET_KEY!, 'base64')
);

// Create and settle payment
const payment = await qwery.createPayment({
  amount: 0.01,
  token: 'SOL',
  recipient: process.env.MERCHANT_WALLET!
});

const result = await qwery.signAndSettle(payment, wallet);
console.log('Payment settled:', result.signature);
```

## Documentation

- **Full Documentation**: https://docs.qwery.xyz
- **API Reference**: https://docs.qwery.xyz/api
- **Examples**: https://github.com/Qwerydotxyz/qwery-sdk/tree/main/examples

## Support

- **GitHub Issues**: https://github.com/Qwerydotxyz/qwery-sdk/issues
- **Discord**: https://discord.gg/qwery
- **Email**: support@qwery.xyz

## License

MIT © Qwery

---

<div align="center">
  Made with ❤️ by the Qwery team
</div>
