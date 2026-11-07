# StudioSpace — Creative Studio Booking Platform

StudioSpace is a full-stack creative studio marketplace that connects creators with professional spaces for photography, filmmaking, podcasting, music production, and other creative projects.

The platform allows creators to discover studios, explore facilities, compare pricing, and book spaces. Studio owners can manage their studio listings and bookings through their accounts.

## Live Demo

**Live Website:** https://studiospace-fontend.vercel.app/

**Frontend Repository:** https://github.com/DevAbedHossain/studio-space-project

**Backend Repository:** https://github.com/DevAbedHossain/studispace-server

---

## Project Overview

Finding a suitable creative space can be challenging. StudioSpace simplifies this process by bringing different types of creative studios into one platform.

Whether someone needs a professional photography studio, a podcast recording room, a music rehearsal space, or a film production stage, StudioSpace helps them find and reserve the right environment.

Studio owners can also list their available spaces, manage studio information, and handle bookings.

## Key Features

### 1. Studio Discovery
- Browse available creative studios.
- Explore studios by category.
- View studio details, images, amenities, and pricing.
- Discover featured studio listings.
- Find spaces suitable for different creative projects.

### 2. Studio Categories

StudioSpace supports different creative studio categories:

- Photo Studio
- Film Stage
- Podcast Lounge
- Music Suite
- Workshop

### 3. Studio Details
- View detailed studio information.
- Explore studio images and galleries.
- Check available amenities and facilities.
- View hourly rental prices.
- Check studio location and maximum capacity.
- View ratings and review counts.

### 4. Authentication
- User registration and login.
- Secure authentication using Better Auth.
- Protected application features.
- JWT-based authentication for protected backend API requests.

### 5. Studio Management
- Add new studio listings.
- Update existing studio information.
- Delete studio listings.
- Manage personal studio listings.
- Store studio details in MongoDB.

### 6. Booking Management
- Create studio bookings.
- View personal booking information.
- Manage booking records.
- Cancel bookings through the available booking functionality.

### 7. User Profile
- Access personal profile information.
- Navigate between profile sections.
- Manage personal studio listings.

### 8. Responsive User Interface
- Modern marketplace design.
- Responsive layouts for different screen sizes.
- Interactive components.
- Clean navigation and user-friendly interfaces.

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework |
| React 19 | User interface |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| shadcn/ui | UI components |
| Base UI | Accessible component primitives |
| Better Auth | Authentication |
| Lucide React | Icons |
| Swiper | Interactive sliders and carousels |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js 5 | REST API |
| MongoDB | Database |
| MongoDB Node.js Driver | Database operations |
| JOSE | JWT verification |
| CORS | Cross-origin resource sharing |
| dotenv | Environment configuration |

## Project Architecture

StudioSpace is organized into two separate repositories:

```text
StudioSpace
│
├── Frontend
│   ├── Next.js
│   ├── React
│   ├── TypeScript
│   ├── Tailwind CSS
│   ├── shadcn/ui
│   └── Better Auth
│
└── Backend
    ├── Node.js
    ├── Express.js
    ├── MongoDB
    ├── REST API
    └── JOSE / JWT
```

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB database (MongoDB Atlas or local MongoDB)

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/DevAbedHossain/studio-space-project.git

cd studio-space-project
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Frontend Environment Variables

Create a `.env.local` file in the frontend root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

# Add your Better Auth and MongoDB configuration
# using the environment variable names required by your auth configuration.
```

Configure the remaining authentication and database variables according to your Better Auth setup.

### 4. Run the Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Backend Setup

### 1. Clone the Backend Repository

Open another terminal:

```bash
git clone https://github.com/DevAbedHossain/studispace-server.git

cd studispace-server
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=8000
MONGO_DB_URL=your_mongodb_connection_string
CLIENT_SERVER_URL=http://localhost:3000
```

Replace the MongoDB connection string with your own database credentials.

`CLIENT_SERVER_URL` must point to the frontend origin that exposes the Better Auth JWKS endpoint.

### 4. Start the Backend

```bash
node index.js
```

The backend API will run at:

```text
http://localhost:8000
```

---

## API Endpoints

The backend provides REST API endpoints for studios and bookings.

### Studio APIs

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/studios` | Get all studios | No |
| GET | `/studios/:id` | Get studio by ID | No |
| POST | `/studios` | Create a studio | Yes |
| PATCH | `/studios/:id` | Update a studio | Yes |
| DELETE | `/studios/:id` | Delete a studio | Yes |
| GET | `/studios/category/:category` | Get studios by category | Yes |
| GET | `/studios/owner/:ownerEmail` | Get studios by owner | Yes |

### Booking APIs

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/booking` | Create a booking | Yes |
| GET | `/booking/:userEmail` | Get bookings by user email | Yes |
| DELETE | `/booking/:id` | Delete a booking | Yes |

Protected endpoints require a valid Bearer token in the request's Authorization header.

Example:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Database Collections

The application uses MongoDB with the following collections:

### Studios

Stores studio listing information, including:

- Studio title and category
- Hourly rate and security deposit
- Location and capacity
- Main image and gallery
- Amenities and overview
- Owner information
- Ratings and review count
- Creation and update timestamps

### Booking

Stores studio booking information, including booking details and user information.

## Deployment

### Frontend Deployment

The frontend is deployed using Vercel.

1. Import the frontend GitHub repository into Vercel.
2. Configure the required environment variables.
3. Set `NEXT_PUBLIC_API_URL` to the deployed backend API URL.
4. Deploy the application.

### Backend Deployment

1. Deploy the backend repository to a Node.js-compatible hosting platform.
2. Configure the MongoDB connection string.
3. Set `CLIENT_SERVER_URL` to the deployed frontend origin.
4. Configure the required environment variables.
5. Ensure the frontend can communicate with the backend through CORS.

## Environment Variables Summary

### Frontend

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| Better Auth variables | Authentication and database configuration required by the frontend |

### Backend

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_DB_URL` | MongoDB connection string |
| `CLIENT_SERVER_URL` | Frontend URL used for Better Auth JWKS verification |

**Security Note:** Never commit `.env` or `.env.local` files, database credentials, or authentication secrets to GitHub.

## Future Improvements

Potential features for future development:

- Advanced studio search and filtering.
- Real-time studio availability calendar.
- Integrated online payments.
- Studio reviews and feedback.
- Booking confirmation notifications.
- Advanced owner dashboard and analytics.
- Improved booking conflict prevention.


