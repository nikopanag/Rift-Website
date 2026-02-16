# Rift Launcher — Website

The marketing website for [Rift Launcher](https://rift-gaming.com), a universal gaming launcher with built-in deal aggregation.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for build tooling
- Deployed on **Vercel**

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Counter.tsx      # Animated number counter
│   ├── Deals.tsx        # Store deals preview section
│   ├── EarlyAccess.tsx  # Waitlist signup section
│   ├── Features.tsx     # Feature grid section
│   ├── Footer.tsx       # Site footer
│   ├── Glow.tsx         # Background glow effect
│   ├── Hero.tsx         # Hero / landing section
│   ├── Logo.tsx         # Rift logo SVG
│   ├── Navbar.tsx       # Sticky navigation
│   └── Stats.tsx        # Animated stats section
├── constants.ts         # Colors, data, and types
├── index.css            # Global styles
├── main.tsx             # Entry point
└── App.tsx              # Root component
```

## License

All rights reserved. &copy; 2026 Rift Launcher.
