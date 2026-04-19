# Buildero 2

Buildero 2 is a specialized web application designed for **Archero 2** players to create, visualize, and share their character builds. It provides a familiar, in-game-like interface optimized for mobile devices, allowing for seamless loadout experimentation.

## 🚀 Key Features

- **Loadout Creator**: Fully customize your build by selecting gear pieces, runes, enchants, heroes, and skins.
- **In-Game Replica UI**: A mobile-first design that closely mirrors the Archero 2 inventory screen for an intuitive and familiar experience.
- **Build Sharing**: Export your builds as compact text strings that others can easily import to see your exact configuration.
- **Privacy-First & No Accounts**: Your builds are saved locally in your browser using LocalStorage. No registration or backend accounts are required.
- **PWA Support**: Install Buildero 2 as a Progressive Web App on your mobile device for quick access.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Serialization**: `lz-string` for compact build codes

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/buildero2.git
   ```
2. Navigate to the project directory:
   ```bash
   cd buildero2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build the project for production:
```bash
npm run build
```

## 📄 License

This project is for personal and community use. Archero 2 assets and trademarks are property of their respective owners.
