# StaffSync Studio — Enterprise Talent & HR Operations Platform

**StaffSync Studio** is an enterprise-grade full-stack Human Resource Management platform engineered with React, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 🎨 Design & UI/UX Features

- **StaffSync Studio Aesthetic**: Modern royal indigo & deep slate theme with subtle gradient backdrops and glassmorphism.
- **Enterprise Command Center**: Live presence punch widget with real-time digital clock, shift states, and KPI metric cards.
- **Personnel Directory**: Roster with department filtering chips, search, and full CRUD modal controls.
- **Leave Management Hub**: Interactive category filing (Annual, Sick, Casual, Maternity, Unpaid) with role-scoped workflows.
- **Time & Presence Engine**: Timestamped clock in/out with automated shift duration and late detection.
- **Broadcast Bulletins Feed**: Company-wide announcements with priority indicators.

---

## 🚀 Quick Start

### 1. Running Both Services

Launch both server and client together by double-clicking `start.bat` or executing:

```powershell
# Terminal 1 — Backend API & Database
cd server
npm start

# Terminal 2 — Frontend Application
cd client
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend REST API**: [http://localhost:5000](http://localhost:5000)

---

## 🔑 Pre-seeded Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@staffsync.com` | `Password123!` |
| **Manager** | `manager@staffsync.com` | `Password123!` |
| **Employee** | `employee@staffsync.com` | `Password123!` |

---

## 🧪 Automated Test Suite

Run the comprehensive backend Jest test suite:

```powershell
cd server
npm test
```
