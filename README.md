# 🎨 Professional Portfolio

Welcome to my personal portfolio project! This repository contains a high-performance, dynamic, and responsive portfolio built with modern web technologies, designed to showcase my skills, experience, and projects in a fun, interactive way (including a doodle pad and easter eggs!).

## 🚀 Features
- **Bilingual Support (i18n):** Full support for English and Arabic (RTL support out-of-the-box).
- **Theme Toggling:** Switch seamlessly between Light and Dark mode.
- **Interactive UI:** Canvas confetti, doodle pad, global mouse trails, and parallax backgrounds.
- **100% Performance:** 
  - Code splitting and chunking via Vite and React.lazy.
  - Resource preconnections for fonts and external media.
  - Image lazy-loading and asynchronous decoding.
  - Minimized re-renders with React `useCallback` and `useMemo`.
- **Print-to-PDF:** A fully optimized print stylesheet allows you to generate a professional CV instantly via the browser's native print dialog.

## 🛠 Tech Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite (esbuild + optimized chunking)
- **Styling:** Tailwind CSS + Vanilla CSS variables for custom themes
- **Icons:** Lucide React
- **Animations:** Custom CSS Animations, Parallax effects, and Canvas Confetti

## 📦 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd portfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🏗 Build & Deploy

To create a production-ready build:

```bash
npm run build
```
This command will output the minified and code-split assets into the `dist` folder. You can test the production build locally using `npm run preview`.

## ✨ Performance Optimizations
This project has been thoroughly optimized to achieve maximum performance:
- **Preconnects:** `<link rel="preconnect">` added to `index.html` for Google Fonts, Flaticon, and Pixabay to speed up DNS resolution.
- **Dynamic Imports:** Heavy components like `DoodlePad`, `GithubGraph`, and `FormalCV` are loaded asynchronously using `React.lazy()` and `<Suspense>`.
- **Memoization:** React hooks like `useCallback` prevent unnecessary re-renders of functions.
- **Vite Chunking:** Separate bundles for vendor dependencies (`react`, `react-dom`) and utilities to improve caching and reduce the initial load payload.

## 📄 License
This project is licensed under the MIT License. Feel free to use it as inspiration for your own portfolio!
