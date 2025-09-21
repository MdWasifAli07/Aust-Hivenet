# AUST HiveNet: A Unified Club & Event Management Platform

**Team Members:**
- Md. Wasif Ali | wasif.cse.20220204054@aust.edu
- Hasibuzzaman Khan Rafi | hasibuzzaman.cse.20220204055@aust.edu
- Hridoy Pranto | hridoy.cse.20220204059@aust.edu
- Ma-Huan Sheikh Meem | mahuan.cse.20220204070@aust.edu

**Project Live Link:** [Not Deployed]  
**Recorded video:** [Insert URL] (Optional)

---

## Table of Contents

1. [Project Description](#1-project-description)
2. [Workflow Overview](#2-workflow-overview)
3. [Main Features](#3-main-features)
4. [Technologies Used](#4-technologies-used)
5. [System Architecture](#5-system-architecture)
6. [Setup Guidelines](#6-setup-guidelines)
    - [Backend](#backend)
7. [Running the Application](#7-running-the-application)
8. [Deployment Status & Tests](#8-deployment-status--tests)
9. [Contribution Table](#9-contribution-table)
10. [Screenshots](#10-screenshots)
11. [Limitations / Known Issues](#11-limitations--known-issues)

---

## 1. Project Description

**AUST HiveNet** is a full-stack platform developed as a course project for **CSE 3100**. The goal of the platform is to unify all AUST clubs and events under one digital platform where students can:
- Browse and follow clubs, receive notifications, and join events.
- Interact with clubs directly for event updates.
- Admins can manage event posts, notifications, and club members.

This platform enhances engagement, communication, and event participation for students, clubs, and administrators. 

---

## 2. Workflow Overview

The system architecture is designed as a full-stack solution with separate workflows for both frontend and backend:
- **Frontend (React.js)**: Students interact with the system, register for events, and receive notifications.
- **Backend (Laravel)**: Clubs post events, manage members, and track participation.
- **Admin Panel (Filament)**: Admins and super admins manage the platform, including content moderation and user roles.

---

## 3. Main Features

### ✅ Student-Side:
- Browse all clubs and upcoming events
- Follow clubs and set interest preferences
- Get event notifications and reminders
- Register for events directly from the platform
- Chat with clubs (AI-integrated chatbot – failed to implement)

### ✅ Club/Admin-Side:
- Post events and manage announcements
- Manage club members and track participation
- Send notifications to followers
- Super Admin can moderate all content, events, and users

---

## 4. Technologies Used

- **Frontend:** React.js, Tailwind CSS, ShadCN UI
- **Backend:** Laravel, Laravel Breeze (authentication), Filament (admin panel), Filament Shield (roles and permissions)
- **Database:** MySQL (hosted on Railway)
- **DevOps & Tools:** Docker for containerization, GitHub Actions for CI/CD, Postman for API testing

---

## 5. System Architecture

The system operates with a clear separation between frontend, backend, and database. Here is a breakdown:
- **Frontend (React.js):** Communicates with the Laravel backend via RESTful APIs to handle events, notifications, and user interactions.
- **Backend (Laravel):** Handles all business logic, user authentication, event posting, and notification management.
- **Database (MySQL):** Stores student, club, event, and user data, hosted on Railway for scalability.
- **Admin Panel (Filament):** Admins use Filament for managing users, roles, and events.

---

## 6. Setup Guidelines  

### Backend  
```bash
# Clone the repository
git clone https://github.com/MdWasifAli07/Aust-Hivenet.git
cd Aust-Hivenet/hivenet

# Install Composer dependencies
composer install

# Setup environment variables
cp .env.example .env
# Edit .env to configure database and other settings

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Install Laravel Breeze (if not already installed)
composer require laravel/breeze --dev
php artisan breeze:install

# Install npm dependencies and build assets
npm install
npm run dev

# Run backend server
php artisan serve

```
## 7. Running the Application  
- Start the backend server with `php artisan serve` (default: http://localhost:8000)  
- Start the frontend development server with `npm run dev` (default: http://localhost:5173)  
- Access the frontend URL in your browser to use the platform locally.  

---  

## 8. Deployment Status & Tests  

| Component | Is Deployed? | Is Dockerized? | Unit Tests Added?  | Is AI feature implemented? |
| --------- | ------------ | -------------- | ------------------ | -------------------------- |
| Backend   | No         | Yes     | No  | No       |
| Frontend  | No          | Yes      | Yes        | No                     |

---
## 9. Contribution Table

| Metric                        | Total | Backend | Frontend | Wasif                                                                                                                                                                                                                                                  | Rafi                                                                                                                                                                                                                                                  | Hridoy                                                                                                                                                                                                                                               | Meem                                                                                                                                                                                                                                                 |
| ----------------------------- | ----- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Issues Solved                 | TBD   | TBD     | TBD      | TBD                                                                                                                                                                                                                                                     | TBD                                                                                                                                                                                                                                                     | TBD                                                                                                                                                                                                                                                     | TBD                                                                                                                                                                                                                                                     |
| WakaTime Contribution (Hours) | TBD   | TBD     | TBD      | [![wakatime](https://wakatime.com/badge/user/25bd1379-89ac-47c1-8743-d56b2288f599/project/ea30f442-b533-47b2-93b1-ead5656b33e5.svg)](https://wakatime.com/badge/user/25bd1379-89ac-47c1-8743-d56b2288f599/project/ea30f442-b533-47b2-93b1-ead5656b33e5) |  [![wakatime](https://wakatime.com/badge/user/f5296c65-f0bc-4c44-9688-6b89e820da8b/project/71a91981-de96-4473-9b5a-5a4d9a792acd.svg)](https://wakatime.com/badge/user/f5296c65-f0bc-4c44-9688-6b89e820da8b/project/71a91981-de96-4473-9b5a-5a4d9a792acd) |[![wakatime](https://wakatime.com/badge/user/c0eb3a4c-6b10-43ca-9489-537dacbac401/project/a4afd59a-463e-4bfd-9e1e-bf53cc56a622.svg)](https://wakatime.com/badge/user/c0eb3a4c-6b10-43ca-9489-537dacbac401/project/a4afd59a-463e-4bfd-9e1e-bf53cc56a622)| [![wakatime](https://wakatime.com/badge/user/119f505c-cbde-4768-9400-0f9daac44200/project/4cc15319-388a-465c-9f1d-2113f8200be7.svg)](https://wakatime.com/badge/user/119f505c-cbde-4768-9400-0f9daac44200/project/4cc15319-388a-465c-9f1d-2113f8200be7) |
| Percent Contribution (%)      | TBD   | TBD     | TBD      | TBD                                                                                                                                                                                                                                                     | TBD                                                                                                                                                                                                                                                     | TBD                                                                                                                                                                                                                                                     | TBD                                                                                                                                                                                                                                                     |

---
## 10. Screenshots

_Include screenshots of the admin dashboard, storefront, POS, and delivery kanban._

---

## 11. Limitations / Known Issues  
- AI chatbot integration was not completed due to technical challenges.  
- Some minor UI responsiveness issues on certain mobile devices.  
- Unit tests coverage is limited, especially on backend.  
- Deployment of frontend and backend is currently pending due to hosting challenges.  
