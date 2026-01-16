# 🚀 Quick Start Guide

## Starting the Application

### Step 1: Start Backend Server
```bash
cd backend
npm run dev
```
✅ Backend running on: http://localhost:5000

### Step 2: Start Frontend Server  
```bash
cd frontend
npm start
```
✅ Frontend running on: http://localhost:3001

### Step 3: Open in Browser
Navigate to: **http://localhost:3001**

---

## First Time Setup

### 1. Admin Login
- Click "Admin Login" in navbar
- **Username**: `admin`
- **Password**: `1234`
- Click "Login"

### 2. Create a Tournament
- Click "Add Tournament" on dashboard
- Fill in details:
  - Name: "City Cricket Championship"
  - Sport: "Cricket"
  - Year: 2024
  - Location: "City Stadium"
- Click "Create Tournament"

### 3. Register Teams
- Click "Add Team"
- Select the tournament you just created
- Enter team name: "Phoenix Warriors"
- Click "Add Team"
- Repeat for more teams (at least 2-4 teams)

### 4. Add Players
- Click "Add Player"
- Select a team
- Enter player name: "Virat Kohli"
- Select role: "Captain"
- (Optional) Add photo URL
- Click "Add Player"
- Repeat to add more players to teams

### 5. Create Matches
- Click "Add Match"
- Select your tournament
- Select round: "QF" (Quarter Finals)
- Select Team A and Team B
- (Optional) Select winner
- Click "Add Match"
- Repeat for SF and FINAL matches

### 6. View Bracket
- Go back to Home (click logo or Home in navbar)
- Click "Bracket" on your tournament
- See all matches organized by round

---

## Testing Workflow

```
1. Login (admin/1234)
   ↓
2. Create Tournament
   ↓
3. Add 4-8 Teams
   ↓
4. Add Players to Teams
   ↓
5. Create QF Matches (4 matches, 8 teams)
   ↓
6. Record Winners
   ↓
7. Create SF Matches (2 matches, winners from QF)
   ↓
8. Record Winners
   ↓
9. Create FINAL Match (1 match, winners from SF)
   ↓
10. Record Champion
    ↓
11. View Bracket - See complete tournament!
```

---

## Key Features to Test

### ✅ Authentication
- [ ] Login with admin/1234
- [ ] Logout button works
- [ ] Protected routes redirect when not logged in
- [ ] Token stored in localStorage

### ✅ CRUD Operations
- [ ] Create tournament
- [ ] Create teams
- [ ] Create players
- [ ] Create matches
- [ ] Delete players
- [ ] Delete teams
- [ ] Delete matches

### ✅ Bracket Functionality
- [ ] Matches display by round
- [ ] Winners show in matches
- [ ] Pending matches show status
- [ ] Auto-updates when new matches added

### ✅ UI/UX
- [ ] Responsive on mobile/tablet
- [ ] Forms validate input
- [ ] Error messages display
- [ ] Loading states work
- [ ] Navigation works

### ✅ Data Persistence
- [ ] Data persists after refresh
- [ ] MongoDB stores all data
- [ ] Relationships work correctly

---

## Common Issues & Solutions

### Issue: "Request failed with status code 401"
**Solution**: 
- Logout and login again
- Ensure you're logged in before creating tournaments

### Issue: Backend won't start
**Solution**:
- Check MongoDB is running
- Verify .env file exists and has MONGO_URI
- Check port 5000 is free

### Issue: Frontend can't connect to backend
**Solution**:
- Ensure backend is running on port 5000
- Check API baseURL in frontend/src/api.js
- Verify CORS is enabled in backend

### Issue: Teams not showing in Add Match
**Solution**:
- Make sure teams are created for the selected tournament
- Refresh the page
- Select tournament again

---

## Useful Commands

### Backend
```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Initialize admin user
node initAdmin.js
```

### Frontend
```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Database
```bash
# MongoDB shell
mongosh

# Check databases
show dbs

# Use tournament database
use khelaDB

# Check collections
show collections

# View documents
db.tournaments.find()
```

---

## API Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}'
```

### Create Tournament
```bash
curl -X POST http://localhost:5000/api/tournaments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name":"City Championship",
    "gameType":"Cricket",
    "year":2024,
    "location":"City Stadium"
  }'
```

### Get All Tournaments
```bash
curl http://localhost:5000/api/tournaments
```

---

## Next Steps

After basic testing:
1. Add more tournaments
2. Create a full bracket (8 teams → QF → SF → Final)
3. Test delete functionality
4. Test responsive design on mobile
5. Check browser console for errors
6. Explore the bracket auto-update feature

---

## Support

If you encounter issues:
1. Check terminal/console for error messages
2. Verify both servers are running
3. Check MongoDB connection
4. Clear browser cache (Ctrl+Shift+Delete)
5. Restart both servers

---

**You're all set! Happy tournament managing! 🏆**
