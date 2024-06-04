# Real Estate Marketplace

## Project Overview

Real Estate Marketplace is a modern web application designed to facilitate the buying and selling of properties. Users can list their properties for sale, view other listed properties, and make offers on properties they are interested in. What sets this platform apart is its dynamic offer system, which allows buyers to submit offers and sellers to accept or reject them. Upon acceptance of an offer, the property is automatically removed from the listings, and the transaction is recorded, where monetization occurs.

## Features

- **User Registration and Authentication**: Users can sign up and log in to their accounts.
- **Property Listings**: Users can list their properties for sale, including images, descriptions, and prices.
- **Property Viewing**: Users can browse and search through available properties.
- **Offer System**: Buyers can make offers on properties, and sellers can accept or reject these offers.
- **Notifications**: Buyers receive notifications when their offers are accepted or rejected.
- **Transaction Management**: Accepted offers are registered as transactions, and properties are removed from the active listings.
- **Image Storage**: Property images are stored in Google Firebase to keep the database lightweight, with only references stored in the database.

## Technology Stack

### Backend

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building APIs.
- **PostgreSQL**: Relational database for storing user, property, bid, and transaction data.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library for storing tokens and user information.

### Cloud Storage

- **Google Firebase**: Cloud storage for property images, reducing the load on the database.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database set up and running.
- Firebase account and storage bucket configured.

### Backend Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/real-estate-marketplace.git
   cd real-estate-marketplace/api

   

   **Install dependencies**
   -npm install

2.**Configure environment variables:**
-Create a .env file in the api folder and add the following configurations:
DATABASE_URL=your_postgresql_database_url
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
JWT_SECRET=your_jwt_secret


