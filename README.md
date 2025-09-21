# AUST HiveNet: A Unified Club & Event Management Platform
**Course:** CSE 3100  

A web-based platform designed to connect all clubs of AUST with their members and interested students. Clubs can share updates about events, and students will receive notifications based on their interests. Students can join events directly through the platform, while admins and super admins have access to their respective dashboards for managing users, events, and notifications

---
## Wakatime (Wasif Ali)
 [![wakatime](https://wakatime.com/badge/github/MdWasifAli99/Aust-HiveNet.svg)](https://wakatime.com/badge/github/MdWasifAli99/Aust-HiveNet)
## Wakatime (Md Hasibuzzaman Khan Rafi )
 [![wakatime](https://wakatime.com/badge/user/f5296c65-f0bc-4c44-9688-6b89e820da8b/project/71a91981-de96-4473-9b5a-5a4d9a792acd.svg)](https://wakatime.com/badge/user/f5296c65-f0bc-4c44-9688-6b89e820da8b/project/71a91981-de96-4473-9b5a-5a4d9a792acd)
 ## Wakatime (Hridoy Saha)
[![wakatime](https://wakatime.com/badge/user/c0eb3a4c-6b10-43ca-9489-537dacbac401/project/a4afd59a-463e-4bfd-9e1e-bf53cc56a622.svg)](https://wakatime.com/badge/user/c0eb3a4c-6b10-43ca-9489-537dacbac401/project/a4afd59a-463e-4bfd-9e1e-bf53cc56a622)
## Wakatime (Ma-Huan Sheikh Meem)
[![wakatime](https://wakatime.com/badge/user/119f505c-cbde-4768-9400-0f9daac44200/project/4cc15319-388a-465c-9f1d-2113f8200be7.svg)](https://wakatime.com/badge/user/119f505c-cbde-4768-9400-0f9daac44200/project/4cc15319-388a-465c-9f1d-2113f8200be7)

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Target Audience](#-target-audience)
- [UI Design](#-ui-design)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Team](#-team)

---

## 📌 About the Project
**AUST HiveNet** is a full-stack platform developed as a course project for **CSE 3100**.  
It aims to bring all AUST clubs under one digital platform where:

- Clubs can share their events and announcements
- Students can follow clubs, express interest, receive notifications
- Students can also join events directly from the platform
- Admins and super admins have access to a dashboard for managing events, members, and notifications

Our mission is to foster better communication between AUST clubs and students, increase engagement, and make event discovery and participation seamless. The platform makes it easy for students to join events, track club activities, and stay up-to-date on all relevant events happening at AUST.

---

## 🚀 Key Features

### ✅ Student-Side
- Browse all clubs and their upcoming events  
- Follow clubs and set interest preferences  
- Get event notifications and reminders  
- Register for events directly from the platform
- Ai integrated chatbot
- Chatting system with clubs for asking different questions

### ✅ Club/Admin-Side
- Post events and manage announcements to keep students informed.
- Manage club members and track who’s interested in which events.
- Send notifications to followers about upcoming events.
- Track event engagement by monitoring the number of participants and interactions.
- Super Admin can oversee all activities, manage multiple clubs, and approve posts/events.
---

## 🎯 Target Audience
- **Students:** Explore clubs, follow events, and register to join activities.
- **Clubs:** Manage events, interact with students, and track participation.
- **Admins:** Moderate content, manage clubs, and track overall event participation.
- **Super Admin:** Oversee the entire platform, manage all clubs and admins, and moderate all content. 

---

## 🎨 UI Design
Modern, clean, and responsive UI designed to be mobile and desktop friendly, with focus on easy event discovery and notifications.

🔗 **Figma Link:** https://www.figma.com/design/qFwMwAFiZTdwok2NvfUMkN/AUST-HiveNet?node-id=43-1002&p=f
---

## 🛠️ Technology Stack

### **Frontend**
- React.js  
- Tailwind CSS ,ShadCN UI  

### **Backend**
- PHP Laravel for handling the backend logic and API
- Laravel Breeze for simple authentication and session management

### **Database**
- MySQL for managing student, club, and event data

### **Hosting / Cloud**
- Vercel / Render / Netlify (TBD)

### **DevOps & Tools**
- GitHub  
- Postman  
- Figma  

---

## ⚙️ Getting Started

### 🔧 Prerequisites
- Node.js >= 18
- MySQL
- PHP >= 8.x
- Composer for managing Laravel dependencies

### 📦 Installation
1. Clone the repository:
```bash
git clone https://github.com/MdWasifAli07/Aust-Hivenet.git
cd Aust-Hivenet
 ```
2. Backend Setup (Laravel Breeze):
```
- Navigate to the backend folder:
cd hivenet

- Install Composer dependencies:
composer install

- Set up the .env file for the database configuration:
cp .env.example .env

- Generate the application key:
php artisan key:generate

- Run migrations to set up the database tables:
php artisan migrate

- Install Laravel Breeze for authentication (if not already done):
composer require laravel/breeze --dev
php artisan breeze:install  
npm install && npm run dev
## Visit: http://localhost:5173/

- Start the backend server:
php artisan serve

- Open your browser and go to:
http://localhost:8000/
```



## Project Structure
```
aust-hivenet/
├── app/                 # Laravel app code (Controllers, Models, etc.)
│   ├── Http/            # Controllers, Middleware, Requests
│   ├── Models/          # Database models
│   ├── config/          # Configuration files
│   └── ...
├── resources/           # Frontend (React) inside resources/js
│   ├── js/              # React source code
│   │   ├── components/  # UI components (buttons, cards, etc.)
│   │   ├── pages/       # Pages (Home, Login, etc.)
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point for React app
│   └── views/           # Blade views for Laravel
├── routes/              # Laravel API & web routes
├── public/              # Public assets (images, CSS)
├── storage/             # Storage files (logs, uploads)
├── tests/               # Feature and Unit tests
├── .env                 # Environment configuration
└── README.md            # Project documentation


```
## 👥 Team

| Name                 | ID           | GitHub / Portfolio |
|----------------------|--------------|---------------------|
| Md. Wasif Ali       | 20220204054  | [GitHub](https://github.com/MdWasifAli07) |
| Hasibuzzaman Khan Rafi  | 20220204055 | [GitHub](https://github.com/Rafi007mr) |
| Hridoy Pranto | 20220204059  | [GitHub](https://github.com/Hridoy992) |
| Ma-Huan Sheikh Meem | 20220204070  | [GitHub](https://github.com/member3) |
