# 🏆 Local Area Sports Tournament Management System

A full-stack web application for managing local sports tournaments with team registration, player management, and automatic bracket generation.

## Features

### 🎮 Core Features
- **Tournament Management**: Create and manage multiple tournaments
- **Team Registration**: Register teams for tournaments
- **Player Management**: Add players to teams with roles and photos
- **Match Scheduling**: Create matches for Quarter-Finals, Semi-Finals, and Finals
- **Bracket Auto-Generation**: Automatic bracket display with winner tracking
- **Admin Authentication**: Secure admin panel with JWT authentication
- **Responsive Design**: Beautiful, mobile-friendly interface with sports theming

### 👥 Public Pages
- **Home**: List all tournaments with status and champions
- **Tournament Details**: View teams and players registered for a tournament
- **Bracket**: View tournament bracket with match results and progression

### 🛡️ Admin Features
- **Login**: Secure admin authentication with JWT tokens (default: admin/khelatournament123@@)
- **Dashboard**: Central hub for managing tournament data
- **Forms**: 
  - Add Tournament (name, sport type, year, location)
  - Add Team (select tournament)
  - Add Player (select team, role, photo URL)
  - Add Match (set round, teams, and winner)
- **Delete Operations**: Remove teams, players, and matches
- **Route Protection**: Admin routes protected with localStorage token check

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap** - CSS framework
- **JavaScript ES6+** - Language

## Project Structure

```
tournament/
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Tournament.js
│   │   ├── Team.js
│   │   ├── Player.js
│   │   └── Match.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tournament.js
│   │   ├── team.js
│   │   ├── player.js
│   │   └── match.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── TournamentDetails.js
    │   │   └── Bracket.js
    │   ├── admin/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── TournamentForm.js
    │   │   ├── TeamForm.js
    │   │   ├── PlayerForm.js
    │   │   └── MatchForm.js
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── PlayerCard.js
    │   ├── utils/
    │   │   └── bracketUtils.js
    │   ├── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or cloud)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/khelaDB
JWT_SECRET=khela_secret_123
```

4. Initialize default admin user:
```bash
node initAdmin.js
```

5. Start server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend runs on `http://localhost:3001` (or available port)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `GET /api/tournaments/:id` - Get tournament by ID
- `POST /api/tournaments` - Create tournament (Admin)
- `DELETE /api/tournaments/:id` - Delete tournament (Admin)

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/tournament/:tournamentId` - Get teams by tournament
- `GET /api/teams/:id` - Get single team
- `POST /api/teams` - Create team (Admin)
- `DELETE /api/teams/:id` - Delete team (Admin)

### Players
- `GET /api/players` - Get all players
- `GET /api/players/team/:teamId` - Get players by team
- `GET /api/players/:id` - Get single player
- `POST /api/players` - Create player (Admin)
- `DELETE /api/players/:id` - Delete player (Admin)

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/tournament/:tournamentId` - Get matches by tournament
- `GET /api/matches/:id` - Get single match
- `POST /api/matches` - Create match (Admin)
- `PUT /api/matches/:id` - Update match winner (Admin)
- `DELETE /api/matches/:id` - Delete match (Admin)

## Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `khelatournament123@@`

⚠️ **Important**: Change these credentials in production by updating the Admin collection in MongoDB!

## 🔐 Role-Based Access Control (RBAC)

This system implements a **professional enterprise-grade RBAC system** with complete separation between public and admin interfaces:

### Public Users
- ✅ Can view tournaments, teams, players, and brackets
- ❌ Cannot create, edit, or delete any data
- ❌ Cannot see admin buttons or dashboard
- ✅ Can navigate public pages without authentication

### Admin Users
- ✅ Can login with secure JWT authentication
- ✅ Can create, update, and delete tournaments, teams, players, and matches
- ✅ Full access to admin dashboard
- ✅ Token auto-included in all API requests
- ✅ Logout clears all session data

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with 10-round salt
- **Route Protection**: All admin routes protected with ProtectedRoute component
- **Token Validation**: Every API request validated on backend
- **localStorage Security**: Dual validation (token + admin flag)
- **Logout Cleanup**: Complete session removal on logout
- **RBAC UI**: Conditional rendering hides admin UI from public users
- **Mobile Support**: Responsive navbar with RBAC

### Documentation
For detailed RBAC implementation information, see:
- [RBAC Implementation Guide](./RBAC_IMPLEMENTATION_GUIDE.md) - Complete architecture and setup
- [RBAC Verification](./RBAC_VERIFICATION.md) - Technical verification checklist
- [RBAC Testing Guide](./RBAC_TESTING_GUIDE.md) - Step-by-step testing scenarios

## Database Schema

### Tournament
```javascript
{
  name: String,
  gameType: String (Cricket, Football, Badminton),
  year: Number,
  location: String,
  champion: ObjectId (Team),
  runnerUp: ObjectId (Team),
  playerOfTournament: ObjectId (Player),
  createdAt: Date,
  updatedAt: Date
}
```

### Team
```javascript
{
  name: String,
  tournament: ObjectId (Tournament),
  createdAt: Date,
  updatedAt: Date
}
```

### Player
```javascript
{
  name: String,
  team: ObjectId (Team),
  role: String (Player, Captain, Vice-Captain),
  photo: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Match
```javascript
{
  tournament: ObjectId (Tournament),
  teamA: ObjectId (Team),
  teamB: ObjectId (Team),
  winner: ObjectId (Team),
  round: String (QF, SF, FINAL),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Guide

### Creating a Tournament

1. Login to admin panel (go to `/admin`)
2. Click "Add Tournament" on dashboard
3. Fill in tournament details:
   - Tournament Name
   - Sport Type (Cricket, Football, or Badminton)
   - Year
   - Location (optional)
4. Click "Create Tournament"

### Registering Teams

1. From Admin Dashboard, click "Add Team"
2. Select the tournament
3. Enter team name
4. Click "Add Team"

### Adding Players

1. From Admin Dashboard, click "Add Player"
2. Select team
3. Enter player name
4. Assign role (Captain, Vice-Captain, or Player)
5. Add photo URL (optional)
6. Click "Add Player"

### Creating Matches

1. From Admin Dashboard, click "Add Match"
2. Select tournament
3. Select round (QF, SF, or FINAL)
4. Choose Team A and Team B
5. Select winner (or leave empty if match pending)
6. Click "Add Match"

### Viewing Bracket

1. Go to Home page
2. Click "Bracket" button on any tournament
3. View matches grouped by round with results

## Features Explained

### Auto Bracket Generation
- Matches are automatically organized by round (QF, SF, FINAL)
- Displays winner for completed matches
- Shows "Pending" for matches without results
- Auto-updates every 5 seconds

### Route Protection
- Admin routes are protected using localStorage token check
- Unauthorized access redirects to login
- Token stored after successful login
- Logout clears token and redirects to login

### Responsive Design
- Mobile-friendly interface
- Works on all screen sizes
- Bootstrap grid system
- Touch-friendly buttons and inputs

### Sports Theme
- Gradient backgrounds
- Sports-themed colors
- Professional card layouts
- Smooth animations and transitions

## Error Handling

- **401 Unauthorized**: Missing or invalid authentication token
- **400 Bad Request**: Missing required fields
- **404 Not Found**: Resource doesn't exist
- **500 Server Error**: Server-side error

All errors display user-friendly messages in the UI.

## Performance Features

- **Bracket Auto-Polling**: Updates every 5 seconds
- **Lazy Loading**: Data fetched on demand
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during operations

## Future Enhancements

- Statistics dashboard for teams and players
- Performance tracking and ratings
- Photo upload instead of URL
- Email notifications
- Search and filter functionality
- Advanced tournament formats (group stage, knockout)
- Leaderboards
- Real-time updates with WebSocket

## Troubleshooting

### Port Already in Use
```bash
# Backend
lsof -i :5000
kill -9 <PID>

# Frontend  
lsof -i :3001
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify connection string is correct

### 401 Error on Tournament Creation
- Ensure you're logged in as admin
- Token might have expired - try logging out and back in
- Check browser localStorage has token

### CORS Errors
- Verify backend is running on port 5000
- Check API baseURL in frontend/src/api.js
- Ensure CORS is enabled in backend (server.js)

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.

---

**Made with ❤️ for local sports tournament management**
