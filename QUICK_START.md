# 🚀 Quick Start Guide

## Prerequisites
- Node.js & npm installed
- MongoDB running locally (`mongod`)
- Git installed

---

## 1️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Initialize admin user (creates admin/khelatournament123@@)
node initAdmin.js

# Start development server
npm run dev
```

**Expected Output**:
```
MongoDB Connected
Server running on port 5000
Admin user created successfully!
```

---

## 2️⃣ Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Expected Output**:
```
Compiled successfully!
On Your Network: http://localhost:3000
```

---

## 3️⃣ Admin Login

1. Open browser to `http://localhost:3000`
2. Click "🔐 Admin" button in Navbar
3. Enter credentials:
   - **Username**: `admin`
   - **Password**: `khelatournament123@@`
4. Click "Login"
5. You're now in the Admin Dashboard

---

## 4️⃣ Create Your First Tournament

### Step 1: Create Tournament
1. Dashboard → "Create Tournament"
2. Fill in:
   - **Name**: e.g., "City Badminton Championship"
   - **Sport**: Select (Cricket/Football/Badminton)
   - **Year**: e.g., 2025
   - **Location**: e.g., "Sports Arena"
3. Click "Create"

### Step 2: Add Teams
1. Dashboard → "Add Team"
2. Select your tournament
3. Enter team names (e.g., "Phoenix", "Warriors")
4. Click "Create"
5. Repeat for all teams

### Step 3: Register Players
1. Dashboard → "Add Player"
2. Select a team
3. Enter player details:
   - **Name**: Player name
   - **Role**: Position/role (optional)
4. Click "Create"
5. Repeat for all players

### Step 4: Create Matches
1. Dashboard → "Manage Matches"
2. Click "➕ Create Match"
3. Select tournament
4. Select round: **QF** (Quarter Finals), **SF** (Semi Finals), or **FINAL**
5. Select Team A and Team B
6. Click "Create Match"
7. Create matches for all rounds

### Step 5: Update Winners
1. Dashboard → "Manage Matches"
2. Click "🏆 Update Winner"
3. Select tournament
4. Select pending match
5. Select winner team
6. Click "Update Winner"
7. **For Final match**: Champion/Runner-up auto-determined! ✨

---

## 5️⃣ View Tournament (Public View)

1. Logout (if admin) or use incognito window
2. Go to `http://localhost:3000`
3. Click tournament card or "Details" button
4. See: Teams, Players, Champion, Runner-up
5. Click "Bracket" to see match progression
6. View results organized by rounds

---

## 📊 Tournament Flow Summary

```
CREATE TOURNAMENT
    ↓
ADD TEAMS
    ↓
REGISTER PLAYERS
    ↓
CREATE QF MATCHES → UPDATE QF WINNERS
    ↓
CREATE SF MATCHES → UPDATE SF WINNERS
    ↓
CREATE FINAL MATCH → UPDATE FINAL WINNER
    ↓
✨ CHAMPION & RUNNER-UP AUTO-DETERMINED ✨
    ↓
PUBLIC VIEW: See complete bracket & results
```

---

## 🎯 Key Features

### Admin Dashboard
- ✅ Create/delete tournaments
- ✅ Add/manage teams
- ✅ Register/manage players
- ✅ Create/update/delete matches
- ✅ Update match winners
- ✅ View all tournament data

### Public Pages
- ✅ View all tournaments
- ✅ See tournament details (teams, players, champion)
- ✅ View bracket with match results
- ✅ See all teams and players
- ✅ Real-time bracket updates

### Automatic Features
- ✅ Champion determined from Final match winner
- ✅ Runner-up determined from Final match loser
- ✅ Match deletion clears champion/runner-up
- ✅ Bracket refreshes every 5 seconds
- ✅ Champion badge displayed automatically

---

## 🔒 Security

| Feature | Status |
|---------|--------|
| Admin Credentials | Environment-based, never in code |
| JWT Authentication | Secure token-based sessions |
| Password Hashing | bcryptjs 10-round hashing |
| Role-Based Access | Admin/Public separation |
| Protected Routes | Backend validation on all API calls |
| No Data Leakage | .env in .gitignore |

**Admin Credentials**:
- Username: `admin`
- Password: `khelatournament123@@`
- Location: `backend/.env` (never commit to Git)

---

## 🎨 UI/UX

### Navbar
- Dark green sports theme (#1a472a)
- Logo: 🏆 Khela Tournament
- Menu: Home, Tournaments, Bracket, Teams, Players
- Admin button: 🔐 Distinct styling
- Mobile: Hamburger menu with smooth animation

### Footer
- Credit: **Mohipal Chowdhury Bari**
- Links: Quick navigation
- Sports categories display
- Professional gradient design

### Bracket Display
- Organized by rounds: QF, SF, FINAL
- Winner highlighted in green 🟢
- Pending matches: ⏳ status
- Champion banner: 🏆 CHAMPION
- Runner-up: 🥈 Display

---

## 🐛 Troubleshooting

### "MongoDB Connected" error at startup
```bash
# Check MongoDB is running
mongod

# Should see: "listening on port 27017"
```

### "Admin user already exists" when running initAdmin.js
- This is normal if admin already created
- Admin is ready to use

### Login failing with correct credentials
```bash
# Clear browser localStorage
F12 → Application → Local Storage → Clear All

# Try login again
```

### Matches not showing up in bracket
```bash
# Check you created matches for the tournament
# Go to Match Form → Select tournament
# Should see created matches in the list
```

### Champion not showing after Final match
```bash
# Ensure you used "Update Winner" mode
# Not just creating a match with winner set
# Final match must be updated to trigger champion determination
```

---

## 📚 File Locations

| Component | File |
|-----------|------|
| Navbar | `frontend/src/components/Navbar.js` |
| Footer | `frontend/src/components/Footer.js` |
| Home | `frontend/src/pages/Home.js` |
| Bracket | `frontend/src/pages/Bracket.js` |
| Teams | `frontend/src/pages/Teams.js` |
| Players | `frontend/src/pages/Players.js` |
| Match Routes | `backend/routes/match.js` |
| Admin Auth | `backend/routes/auth.js` |

---

## 🌐 URLs

| Page | URL |
|------|-----|
| Home | `http://localhost:3000/` |
| Admin Login | `http://localhost:3000/admin` |
| Teams | `http://localhost:3000/teams` |
| Players | `http://localhost:3000/players` |
| Backend API | `http://localhost:5000/api` |

---

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can login with admin credentials
- [ ] Can create tournament
- [ ] Can add teams and players
- [ ] Can create matches by round
- [ ] Can update match winners
- [ ] Champion displays after Final match
- [ ] Public can view bracket
- [ ] Navbar works on mobile

---

## 📞 Need Help?

1. **Check browser console** (F12 → Console)
2. **Check backend logs** (terminal where `npm run dev` is running)
3. **Verify MongoDB** is running (`mongod` in another terminal)
4. **Verify credentials** are correct in `backend/.env`
5. **Clear cache** (Ctrl+Shift+Delete or Cmd+Shift+Delete)
6. **Restart both servers** (backend and frontend)

---

## 🎓 What You'll Learn

- ✅ Full-stack development (React + Express + MongoDB)
- ✅ Responsive web design (mobile-first)
- ✅ Secure authentication (JWT + environment variables)
- ✅ REST API design and usage
- ✅ Database design and relationships
- ✅ Real-world tournament logic

---

**Happy Tournament Managing! 🏆**
