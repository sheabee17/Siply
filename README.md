# ☕ Cafe Finder App

A mobile app for discovering and reviewing local coffee shops. Built with Expo (React Native), Node.js, and Prisma.

## Tech Stack

- **Frontend:** Expo / React Native with file-based routing via Expo Router
- **Backend:** Node.js + Express
- **Database:** SQLite via Prisma ORM

## Project Structure

```bash
app/
├── (tabs)/
│   ├── browse.tsx        # Search & filter cafes
│   ├── profile.tsx       # Current user's profile
│   ├── edit-profile.tsx  # Edit profile form
│   └── _layout.tsx       # Tab bar layout
├── cafe/
│   └── [slug].tsx        # Individual cafe page (Overview, Reviews, Vibes)
├── user/
│   └── [id].tsx          # Public user profile page
├── index.tsx             # Entry point
└── _layout.tsx           # Root layout

components/
├── OverviewTab.tsx
├── ReviewsTab.tsx
├── VibesTab.tsx
├── UserProfile.tsx
├── ProfileHeader.tsx
├── ProfileStats.tsx
├── UserReviewsSection.tsx
└── EditProfileForm.tsx

hooks/
├── use-user.ts           # Fetches user from API
└── use-current-user.ts   # Returns the logged-in user's ID

prisma/
└── schema.prisma         # DB schema

index.js                  # Express API server
seed.js                   # Seeds the database with sample data
```

## Get Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
npx prisma migrate dev
node seed.js
```

### 3. Start the backend

```bash
node index.js
```

### 4. Start the app

```bash
npx expo start
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/cafes` | Get all cafes |
| GET | `/api/cafes/:slug` | Get a single cafe with reviews |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a single user with reviews |
| PUT | `/api/users/:id` | Update user profile |

## Database Schema

- **User** - name, email, bio, location, avatar, activeSince
- **Cafe** - name, slug, description, address, openHours, wifiSpeed, powerOutlets, noiseLevel, distance
- **Review** - rating, comment, linked to User and Cafe
- **Tag, Amenity, Vibe, CafeImage** - linked to Cafe