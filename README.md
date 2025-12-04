# JavaGem - Mobile Coffee Shop App

A production-ready mobile coffee shop application built with React Native, Expo, and TypeScript. This app provides a complete coffee ordering experience with product browsing, cart management, order tracking, and more.

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library (Stack + Bottom Tabs)
- **Zustand** - Lightweight state management for cart
- **Expo Vector Icons** - Icon library

## Features

- 🎨 **Modern UI Design** - Clean, warm brown color scheme matching the Figma template
- 🏠 **Home Screen** - Browse coffee products with search and category filtering
- 📱 **Product Details** - View detailed product information with size selection
- 🛒 **Shopping Cart** - Add items, manage quantities, and view order summary
- 📍 **Order Tracking** - Track your order status with visual progress indicators
- 👤 **User Profile** - Profile management and settings

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- Expo Go app on your iOS/Android device (for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mygolario/Ario-Coffeeshop.git
cd Ario-Coffee-Shop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
   - Scan the QR code with Expo Go (iOS) or Camera app (Android)
   - Or press `i` for iOS simulator, `a` for Android emulator

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppText.tsx
│   ├── AppButton.tsx
│   ├── IconButton.tsx
│   ├── Tag.tsx
│   └── ProductCard.tsx
├── screens/            # Screen components
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProductDetailScreen.tsx
│   ├── OrderScreen.tsx
│   ├── OrderTrackingScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/         # Navigation configuration
│   ├── RootNavigator.tsx
│   └── BottomTabs.tsx
├── store/              # State management
│   └── cartStore.ts
├── theme/              # Design system
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
├── data/               # Mock data
│   ├── products.ts
│   └── orders.ts
└── types/              # TypeScript type definitions
    └── index.ts
```

## Design System

### Colors
- **Primary**: `#C67C4E` - Brown buttons and highlights
- **Secondary**: `#EDD6C8` - Light cream
- **Text Primary**: `#313131` - Dark text
- **Text Secondary**: `#6A6A6A` - Subtle gray
- **Background**: `#F9F2ED` - Warm background
- **Border**: `#E3E3E3` - Light borders

### Typography
- Uses system fonts (Sora font can be integrated via `expo-google-fonts/sora` for production)

## Known Limitations

- **Mock Data**: All product data and orders are mocked. No real backend integration.
- **Fake Tracking**: Order tracking uses static UI elements, no real GPS or real-time updates.
- **No Payments**: Payment processing is simulated. No actual payment gateway integration.
- **No Authentication**: User authentication is not implemented (assumes always authenticated after onboarding).
- **Placeholder Images**: Product images use placeholder assets. Replace with actual coffee images.

## Development

### Branch Workflow

The project uses a feature branch workflow:
- Main branch: `main`
- Feature branch: `feature/mobile-coffee-shop`

### Committing Changes

Follow conventional commit messages:
- `chore: setup expo and navigation`
- `feat: add theme and base components`
- `feat: implement home and product detail screens`
- `feat: add cart and order flow`

## Future Enhancements

- [ ] Integrate real backend API
- [ ] Add user authentication
- [ ] Implement real-time order tracking
- [ ] Add payment gateway integration
- [ ] Include actual product images
- [ ] Add push notifications
- [ ] Implement user reviews and ratings
- [ ] Add favorite products functionality

## License

MIT License - See LICENSE file for details

## Author

Ario Kaveh
