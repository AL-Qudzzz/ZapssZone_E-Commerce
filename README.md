## E-commerce Starter Project

This is a Next.js starter project for an e-commerce application, integrated with Firebase. It provides a foundation for building a scalable and feature-rich online store.

## Features

* User authentication (Login, Signup, Forgot Password)
* Product listing and detail pages
* Shopping cart functionality
* Checkout process with address and payment steps
* Order tracking
* Seller dashboard (basic functionality)
* AI product description generation (using Genkit)
* Mobile responsiveness

## Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* Firebase (Authentication, Firestore)
* Genkit (for AI features)

## Setup Instructions

1. Clone the repository.
2. Install dependencies: `npm install` or `yarn install`
3. Set up Firebase:
    * Create a Firebase project.
    * Enable Authentication (Email/Password provider).
    * Enable Firestore.
    * Copy your Firebase project configuration and add it to `src/lib/firebase.ts`.
4. Set up Genkit (optional, for AI features):
    * Follow the Genkit setup instructions (https://genkit.dev/).
    * Configure the appropriate AI model.

## How to Run the Project

1. Run the development server: `npm run dev` or `yarn dev`
2. Open your browser and navigate to `http://localhost:3000`.

To get started with development, take a look at `src/app/page.tsx` for the main application entry point.