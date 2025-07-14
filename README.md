# 🗺️ Natours – Tour Booking Web App
<p align="center">
  <img width="297" height="297" alt="Image" src="https://github.com/user-attachments/assets/546e36c3-0a68-4466-b5b6-fe76bf853361" />
</p>

An awesome full-stack **tour booking platform** built with **Node.js, Express, MongoDB, Stripe**, and more! The app supports **secure authentication**, **role-based access control**, **real-time online payments**, **booking management**, **tour reviews**, **user profiles**, and a powerful **admin dashboard**. This project is part of the Node.js bootcamp by [Jonas Schmedtmann](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/).

---

## 🔗 Live Demo

👉 [Visit the Live App](https://natours-two-pi.vercel.app/)

---

## 🧩 Tech Stack

| Category        | Technologies |
|----------------|--------------|
| **Frontend**    | Pug, CSS3, JavaScript |
| **Backend**     | Node.js, Express.js |
| **Database**    | MongoDB Atlas, Mongoose |
| **Authentication** | JSON Web Tokens (JWT), Cookies |
| **Payment**     | Stripe API |
| **Email Service** | Mailtrap |
| **Other Tools** | ParcelJS, leaflet, Multer, Nodemailer, Postman |
| **Security**    | Helmet, xss-clean, rate-limit, mongo-sanitize |
| **Deployment**  | Render, Heroku (alternative) |

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Sign up, log in, logout
- Forgot/reset password via email
- Role-based access: Admin, Lead Guide, Guide, User

### 👤 User Profile
- Update name, email, password, and profile photo
- View personal bookings and favorite tours

### 🌍 Tours
- View tours with photos, locations, guides, and ratings
- Admin/Lead Guide can create, update, delete tours

### 🧾 Bookings
- Book tours using **Stripe** (card payments)
- View and manage your bookings
- Admin/Lead Guide can create, update, or delete any booking

### ⭐ Reviews & Ratings
- Leave reviews only if you booked the tour
- Edit or delete your own reviews
- Admin can delete any review

---

## ⚙️ Getting Started Locally
```bash
### 1. Clone the repo

git clone https://github.com/Ahmedabdelaziz77/Natours.git
cd Natours
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file in the root:
NODE_ENV=development
PORT=3000

DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/natours
DATABASE_PASSWORD=yourMongoPassword

JWT_SECRET=yourSuperSecret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_USERNAME=yourMailtrapUsername
EMAIL_PASSWORD=yourMailtrapPassword
EMAIL_FROM=your@email.com
STRIPE_SECRET_KEY=yourStripeSecretKey
STRIPE_WEBHOOK_SECRET=yourStripeWebhookSecret

4. Start the app
npm run dev
🧪 Testing the API (Postman)
Set your environment variables:
{{URL}}	http://localhost:3000
{{password}}	test1234
Useful Endpoints
GET /api/v1/tours → Get all tours
GET /api/v1/tours/top-5-cheap → Top 5 cheap tours
POST /api/v1/bookings/checkout-session/:tourId → Start checkout
POST /api/v1/users/signup → Sign up
PATCH /api/v1/users/updateMe → Update profile

🧱 Project Structure
natours/
│
├── controllers/
├── models/
├── public/
├── routes/
├── utils/
├── views/
├── .env
├── app.js
├── server.js
└── package.json
🚀 Deployment Guide
Add .env variables in dashboard
Set start command: npm run start:prod
```
🎯 To-Do
 - Progressive Web App (PWA) support
 - Recently viewed tours
 - Tour search with filters
 - Two-factor authentication
 - Admin analytics dashboard

🎯 Known Bugs
- First-time page loads on free hosting may be slow.
- Stripe test mode only (no live payments).
- Email services need proper credentials in .env.
