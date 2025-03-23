# IRCTC Redesign 🚂

Welcome to the **IRCTC Redesign** project—a modern, user-friendly train booking application built with React, Tailwind CSS, and Framer Motion. This project aims to enhance the user experience of booking train tickets with a clean UI, advanced animations, and a premium look, designed to stand out in a hackathon.

![IRCTC Redesign Banner](https://via.placeholder.com/1200x400.png?text=IRCTC+Redesign+Banner)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Train Animation](#train-animation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About the Project

The IRCTC Redesign project reimagines the Indian Railway Catering and Tourism Corporation (IRCTC) website with a modern, train-themed aesthetic. The app focuses on:

- **User-Friendly Interface**: Simplified booking process with a clean, intuitive design.
- **Premium Look**: Light backgrounds (`bg-gray-50`), dark elements (`bg-blue-600`), and glassmorphism effects.
- **Advanced Animations**: Pure CSS animations (e.g., moving train) and Framer Motion for interactive elements.
- **Engaging Content**: Promotions, loyalty rewards, and travel class showcases to enhance user engagement.

This project was developed as part of a hackathon to demonstrate modern web development practices and design principles.

---

## Features

- **Train Booking**: Step-by-step booking process with journey details, seat selection, and booking summary.
- **Promotions**: Exclusive offers like bonus points and free upgrades (no coupon codes).
- **Loyalty Program**: Rewards catalog, membership tiers, and recent activity tracking.
- **Train Card**: Detailed train information with departure/arrival times, amenities, and seat availability.
- **Responsive Design**: Fully responsive across all devices using Tailwind CSS.
- **Animations**: Moving train animation in the hero section, card slide effects, and pulsating dots for journey progress.

---

## Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (for interactive elements), Pure CSS (for moving train and other effects)
- **Notifications**: React Hot Toast
- **Routing**: React Router
- **Deployment**: Vercel

---

## Installation

To run the project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/irctc-redesign.git
   cd irctc-redesign
   ```

2. **Install Dependencies**;

```bash
  npm install
```

3. **Run the Development Server**;

```bash
  npm run dev

```

4. **Open in Browser**;

```bash
  http://localhost:3000

```

## Usage

1. Homepage: Explore the landing page with a moving train animation and quick links to book tickets or view promotions.
2. Book a Train:
   Navigate to /book.
   Enter journey details (from, to, date, class).
   Select seats and proceed to payment.
3. View Promotions:
   Navigate to /promotions.
   Check out exclusive offers like bonus points and free upgrades.
4. Loyalty Program:
   Navigate to /loyalty.
   View rewards, membership tiers, and recent activity.
5. Login/Signup:
   Use /login or /signup to access your account with a split-screen design.

   ![Landing Page](screenshots/landing-page.png)
   ![Train Booking Page](screenshots/train-booking-page.png)
   ![Promotions Page](screenshots/promotions-page.png)
   ![Loyalty Page](screenshots/loyalty-page.png)
   ![Train Card](screenshots/train-card.png)

## Deployment

The project is deployed on Vercel and can be accessed here:

[🔗 Live Demo](https://irctc-co-redesign.vercel.app/)

## Contributing

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a new branch (git checkout -b feature/your-feature).
3.  Make your changes and commit (git commit -m "Add your feature").
4.  Push to the branch (git push origin feature/your-feature).
5.  Open a Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the file for details.

## Acknowledgements

Tailwind CSS: For the utility-first CSS framework.
Framer Motion: For smooth animations and transitions.
React Hot Toast: For user-friendly notifications.
Vercel: For seamless deployment.
FontAwesome: For the icons used throughout the app.

Built with 💻 and 🚂 by Gagan Hegde.
