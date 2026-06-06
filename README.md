# 🔗 URL Shortener Backend

### 👨‍💻 Developed By

**Udit U Gunagi**

A scalable URL shortening service built with Node.js, Express, PostgreSQL, and Redis. The system generates compact Base62 short URLs, supports custom aliases, tracks click analytics, and handles automatic redirection.

---

## 🔗 Links

### 🌐 Live Demo

https://url-shortener-frontend-coral-tau.vercel.app/

### 💻 Frontend Repository

https://github.com/code-udit/url-shortener-frontend.git

### ⚙️ Backend Repository

https://github.com/code-udit/url-shortener-backend.git

---

## 🚀 Overview

URL Shortener Backend is responsible for:

* Creating shortened URLs
* Supporting custom short codes
* Redirecting users to original URLs
* Tracking click counts
* Providing URL analytics
* Managing URL storage in PostgreSQL
* Supporting scalable architecture with Redis integration

---

## 🛠 Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Redis
* Docker Ready
* Base62 Encoding
* JavaScript (ES6)

---

## 🧱 System Architecture

```text
Client
   │
   ▼
Express API
   │
   ▼
PostgreSQL Database
   │
   ▼
URL Storage & Analytics

User Visit
   │
   ▼
Short URL
   │
   ▼
Redirect Service
   │
   ▼
Original URL
```

---

## 📁 Project Structure

```bash
url-shortener-backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   └── urlController.js
│   │
│   ├── middlewares/
│   │   └── errorHandler.js
│   │
│   ├── routes/
│   │   └── urlRoutes.js
│   │
│   └── services/
│       └── shortCodeService.js
│
├── server.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

---

## ✨ Features

### 🔗 URL Shortening

* Generate short URLs
* Base62 encoding algorithm
* Unique short code generation
* Fast URL lookup

### ✏️ Custom Short URLs

* User-defined aliases
* Duplicate alias validation
* Easy-to-share custom links

### 🚀 URL Redirection

* Instant redirect to original URL
* HTTP redirect support
* Optimized lookup queries

### 📊 Analytics

* Click tracking
* Original URL retrieval
* Creation timestamp tracking
* Usage statistics

### ⚡ Scalability

* PostgreSQL storage
* Redis integration support
* Modular architecture
* Docker-ready deployment

---

## 🗄 Database Schema

### urls

| Column       | Type      |
| ------------ | --------- |
| id           | Integer   |
| original_url | Text      |
| short_code   | String    |
| clicks       | Integer   |
| created_at   | Timestamp |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/url_shortener

REDIS_URL=redis://localhost:6379

BASE_URL=http://localhost:5000
```

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/code-udit/url-shortener-backend.git

cd url-shortener-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create:

```bash
.env
```

Add the required environment variables.

### 4. Start PostgreSQL

Ensure PostgreSQL is running.

### 5. Start Redis

Ensure Redis is running.

---

## ▶️ Run Application

### Development

```bash
nodemon server.js
```

### Production

```bash
node server.js
```

Application runs on:

```bash
http://localhost:5000
```

---

## 📡 API Endpoints

### Create Short URL

```http
POST /api/shorten
```

Request Body:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

### Create Custom Short URL

```http
POST /api/shorten
```

Request Body:

```json
{
  "url": "https://example.com",
  "customCode": "my-link"
}
```

Response:

```json
{
  "shortUrl": "http://localhost:5000/my-link"
}
```

---

### Redirect to Original URL

```http
GET /:shortCode
```

Example:

```http
GET /abc123
```

Redirects user to the stored original URL.

---

### URL Analytics

```http
GET /api/analytics/:shortCode
```

Response:

```json
{
  "original_url": "https://example.com",
  "clicks": 25,
  "created_at": "2025-01-01T10:00:00.000Z"
}
```

---

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

## 🔄 URL Workflow

1. User submits a URL
2. URL stored in PostgreSQL
3. Unique Base62 code generated
4. Short URL returned
5. User visits short URL
6. Click count updated
7. User redirected to original URL
8. Analytics available through API

---

## 🔢 Base62 Encoding

The application uses Base62 encoding:

```text
0-9
a-z
A-Z
```

Benefits:

* Shorter URLs
* URL-safe characters
* Efficient ID conversion
* Scalable code generation

---

## 🐳 Docker Support

Run the application using Docker:

```bash
docker-compose up --build
```

Services:

* Node.js API
* PostgreSQL
* Redis

---

## 📈 Future Improvements

* User Authentication
* URL Expiration
* QR Code Generation
* Custom Domains
* Rate Limiting
* Detailed Analytics Dashboard
* URL Password Protection
* Bulk URL Shortening
* API Key Management
* Kubernetes Deployment

---

## 👨‍💻 Author

Developed by **Udit U Gunagi**


