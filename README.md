# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# ChatBot AI - Nhost React Application

A modern, responsive chatbot application built with React, TypeScript, and Nhost. Features real-time messaging, user authentication, and a clean, intuitive interface.

## ✨ Features

- 🔐 **User Authentication** - Secure sign-up and sign-in with email/password
- 💬 **Real-time Chat** - Live messaging with AI assistant using GraphQL subscriptions
- 📱 **Responsive Design** - Beautiful UI that works on desktop and mobile
- 🎨 **Modern Interface** - Clean, gradient-based design with smooth animations
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🔄 **Live Updates** - Real-time chat list and message updates

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Nhost (GraphQL, Authentication, Real-time subscriptions)
- **Styling**: Modern CSS with gradients and animations
- **State Management**: Apollo Client for GraphQL state
- **Icons**: Custom SVG icons

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and pnpm/npm
- Nhost account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nhost-chatbot
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Nhost configuration:

   ```env
   VITE_NHOST_SUBDOMAIN=your-project-subdomain
   VITE_NHOST_REGION=your-project-region
   ```

4. **Start development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   │   ├── Auth.tsx
│   │   └── Auth.css
│   ├── chat/          # Chat-related components
│   │   ├── ChatList.tsx
│   │   ├── ChatList.css
│   │   ├── ChatWindow.tsx
│   │   └── ChatWindow.css
│   └── layout/        # Layout components
│       ├── Header.tsx
│       └── Header.css
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main application component
├── App.css          # Application styles
├── main.tsx         # Application entry point
├── nhost.ts         # Nhost client configuration
├── graphql.ts       # GraphQL queries and mutations
└── index.css        # Global styles
```

## 🔧 Configuration

### Nhost Setup

1. Create a new project at [nhost.io](https://nhost.io)
2. Get your project's subdomain and region from the dashboard
3. Add them to your `.env` file
4. Configure your database schema and authentication settings

### GraphQL Schema

The application expects the following database tables:

- `chats` - Chat conversations
- `messages` - Individual messages within chats

## 🎨 UI/UX Features

- **Modern Design**: Gradient-based color scheme with subtle shadows
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Fade-in effects and hover states
- **Loading States**: Spinners and skeleton screens
- **Empty States**: Helpful messages when no data is available
- **Accessibility**: Proper focus management and ARIA labels

## 🚀 Build for Production

```bash
pnpm build
# or
npm run build
```

The built files will be in the `dist/` directory.

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help, please open an issue in the repository.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
