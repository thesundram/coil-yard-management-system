# Coil Yard Management System

A modern, interactive web application for managing and visualizing coil inventory in yard zones. Built with Next.js 16, React 19, and TypeScript.

## Features

- **Interactive Yard Visualization**: Visual representation of yard zones and coil placement
- **Excel Import**: Upload and import coil data from Excel files
- **Real-time Search**: Quick search and filter functionality for coils
- **Coil Management**: View detailed coil information and manage transfers
- **Statistics Dashboard**: Real-time statistics and analytics
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark Mode Support**: Built-in theme switching capability

## Tech Stack

- **Framework**: Next.js 16.0.10
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Excel Processing**: XLSX
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yard-and-coil-visualization
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading state
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── yard/             # Yard-specific components
│   ├── footer.tsx        # Footer component
│   └── theme-provider.tsx # Theme provider
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and types
│   ├── data.ts          # Data management
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Helper functions
├── public/              # Static assets
└── styles/              # Additional styles
```

## Key Components

- **YardArea**: Main visualization component for yard zones
- **CoilTable**: Tabular view of coil inventory
- **ExcelUpload**: Excel file import functionality
- **SearchPanel**: Search and filter interface
- **StatsBar**: Statistics display
- **CoilDetailsPanel**: Detailed coil information view
- **TransferDialog**: Coil transfer management

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## License

© **2026** Designed by **Sundram Pandey** - **Uttam Innovative Solution Pvt. Ltd.**

## Support

For support and inquiries, please contact **Uttam Innovative Solution Pvt. Ltd.**
