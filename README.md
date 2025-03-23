# IRCTC Redesign - Frontend Project

![IRCTC Redesign](https://www.irctc.co.in/nget/assets/images/new-train.png)

A modern redesign of the IRCTC (Indian Railway Catering and Tourism Corporation) website with enhanced UI/UX and features. This project focuses on creating a more intuitive, visually appealing, and user-friendly experience for train and travel bookings.

## 🌟 Latest Updates

- Created a modern **Loyalty Page** with rewards program, tier benefits, and personalized dashboard
- Added **eWallet Page** with transaction history and secure payment features
- Designed a stunning **Hotels Page** with search functionality and hotel listings
- Built an interactive **Meals Page** for food ordering during train journeys
- Implemented a user-friendly **Flights Page** for booking air tickets
- Added a comprehensive **Buses Page** for interstate bus bookings
- Enhanced navigation with consistent theming and improved visual design

## ✨ Features

- **Modern UI/UX Design**: Clean, intuitive interface with responsive design
- **Smooth Animations**: Engaging user interactions using Framer Motion
- **Comprehensive Travel Services**: Trains, hotels, flights, buses, and meal booking
- **Loyalty Program**: Reward system with tiers and benefits
- **Interactive Elements**: Dynamic form controls, animated cards, and responsive layouts
- **Light Color Theme**: Bright, accessible design with proper contrast
- **Performance Optimized**: Fast loading and smooth transitions

## 🛠️ Technology Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **GSAP**: Advanced animations and scroll effects
- **React Icons**: Icon components for visual elements
- **React Hot Toast**: Notifications system

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/irctc-redesign.git
   cd irctc-redesign
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📸 Required Assets

The project uses various images and icons:

- Logo: `/public/logo.png`
- Secondary Logo: `/public/irctc-right-logo.png`
- Train Banner: `/public/assets/images/train_banner.jpg`

For missing assets, the application uses fallback images from IRCTC's website.

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Page components
│   ├── LandingPage.jsx
│   ├── TrainListPage.jsx
│   ├── LoyaltyPage.jsx
│   ├── WalletPage.jsx
│   ├── HotelsPage.jsx
│   ├── MealsPage.jsx
│   ├── FlightsPage.jsx
│   ├── BusesPage.jsx
│   └── ...
├── hooks/           # Custom React hooks
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## 🔍 Key Features by Page

### Landing Page

- Hero section with search functionality
- Popular routes and destinations
- Testimonials and special offers

### Loyalty Page

- Membership tiers with benefits visualization
- Points tracking and rewards catalog
- Recent activity tracker

### eWallet Page

- Balance management and transaction history
- Multiple payment methods
- Quick actions for bookings

### Hotels Page

- Hotel search with filters
- Detailed listings with amenities
- Rating and review system

### Meals Page

- Station and PNR-based meal ordering
- Categorized menu with dietary filters
- Interactive cart system

### Flights Page

- Flight search with multi-city options
- Popular routes and best deals
- Feature highlights and benefits

### Buses Page

- Route search with interactive calendar
- Bus listings with amenities and ratings
- Seat selection preview

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

- Design inspiration from modern travel websites
- Icons from React Icons and Font Awesome
- Images from Unsplash and IRCTC website
