<div align="center">
  <img src="https://res.cloudinary.com/dkfwg4ta8/image/upload/v1763919238/sdk_banner_oq2ed9.png" alt="Qwery SDK Banner" width="100%" />
</div>

# Qwery SDK

TypeScript SDK for integrating Qwery x402 Payment Facilitator into your applications.

[![npm version](https://badge.fury.io/js/@qwerydotxyz%2Fqwery-sdk.svg)](https://www.npmjs.com/package/@qwerydotxyz/qwery-sdk)
[![GitHub](https://img.shields.io/github/license/Qwerydotxyz/qwery-sdk)](https://github.com/Qwerydotxyz/qwery-sdk)

## Installation
```bash
npm install @qwerydotxyz/qwery-sdk
# or
yarn add @qwerydotxyz/qwery-sdk
# or
pnpm add @qwerydotxyz/qwery-sdk
```

## Quick Start
```typescript
import { QweryPayment } from '@qwerydotxyz/qwery-sdk';

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

// Sign and settle with Phantom wallet
await qwery.signAndSettle(payment, window.solana);
```

## Features

- 🚀 **Zero User Fees** - Facilitator pays network costs
- ⚡ **Instant Settlement** - Sub-2 second transaction finality
- 💰 **Multi-Token Support** - SOL, USDC, USDT on Solana
- 🔒 **Type-Safe** - Full TypeScript support with types
- 📦 **Tree-Shakeable** - ESM build for optimal bundle size
- �� **Universal** - Works in browser and Node.js

## Documentation

- **npm Package**: https://www.npmjs.com/package/@qwerydotxyz/qwery-sdk
- **GitHub**: https://github.com/Qwerydotxyz/qwery-sdk
- **Facilitator API**: https://facilitator.qwery.xyz
- **API Docs**: https://facilitator.qwery.xyz/docs

## License

MIT © Qwery
