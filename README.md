# RichestRevealer Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), enhanced with integrations to a privacy-preserving Ethereum smart contract called **RichestRevealer**.

The frontend interacts with the smart contract to submit encrypted wealth values, compute the richest participant securely, and reveal results with privacy protections powered by the [Inco Lightning SDK](https://docs.inco.org/js-sdk).

## Project Links
- [Smart Contract Repo 🔗](https://github.com/HarshS1611/richest-revealer-contract)
- [Smart Contract Walkthrough Video 🔗](https://www.loom.com/share/9aa614f058c94ad0bf696541270a80f6?sid=37953322-3e76-4137-95a5-19f5945426eb)
- [Walkthrough video smart contract 🔗](https://sepolia.basescan.org/address/0x6adafc3cb7255b2539f01c2387096eb3c69e47ea)
- [Frontend Walkthrough Video 🔗](https://www.loom.com/share/693d079657ac498c9f37b46a1c8ae488?sid=f2ac46df-d9af-4f8d-9a86-b67e4af33ce9)
---

![image](https://github.com/user-attachments/assets/14b982c2-f887-4b55-b326-48f4f4e1e2d8)


## Features

- **Encrypted Wealth Submission**: Participants submit encrypted wealth values using Inco Lightning SDK, ensuring privacy.
- **Smart Contract Interaction**: Connects to the RichestRevealer smart contract on your chosen testnet or local blockchain.
- **Participant Status Tracking**: Shows real-time submission statuses of known participants.
- **Winner Highlighting**: Visually highlights the richest participant(s) with dynamic UI feedback.
- **Owner-Restricted Actions**: Restricts privileged actions like computing richest and requesting decryption to contract owner.
- **Responsive and Accessible UI**: Clean design using Tailwind CSS for styling, including clear submission and winner status indicators.
- **Toast Notifications**: Displays toast messages for every tansaction and fetch request.

---

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn or pnpm
- A wallet like MetaMask configured to your testnet (e.g., Goerli)
- Access to the deployed **RichestRevealer** contract address and ABI
- API keys or configuration for Inco Lightning SDK (testnet mode)

### Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd richestrevealer-frontend
npm install
# or
yarn install
# or
pnpm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


### Key Files Explained

- **app/page.tsx**: The main UI entry point displaying participants, submission buttons, and results.
- **app/components/ContractInteraction.tsx**: Displays each participant’s info with their submission and winner status and other components.
- **app/hooks/useRichestRevealer.ts**: Custom hook to interface with the RichestRevealer smart contract via `viem` and set toast fetch data and status.
- **utils/contract.js**: Contains the smart contract address and ABI for easy import.

---

![image](https://github.com/user-attachments/assets/032646da-cc01-4dac-9c43-92a36535d2e1)


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
