# 🧪 Complete Testing Guide

## Pre-Test Checklist
- [ ] MongoDB is running
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3001
- [ ] Browser open to http://localhost:3001
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] No console errors

---

## TEST 1: Authentication ✅

### Test 1.1: Login with Correct Credentials
**Steps:**
1. Navigate to http://localhost:3001
2. Click "Admin Login" button
3. Enter username: `admin`
4. Enter password: `1234`
5. Click "Login"

**Expected:**
- Redirects to admin dashboard
- Navbar shows "Dashboard" and "Logout" links
- No error messages

**Status:** ___________

### Test 1.2: Login with Wrong Credentials
**Steps:**
1. Go to `/admin`
2. Enter username: `wrong`
3. Enter password: `wrong`
4. Click "Login"

**Expected:**
- Error message displays
- Stays on login page
- No redirect

**Status:** ___________

### Test 1.3: Logout
**Steps:**
1. From dashboard, click "Logout" button
2. Observe redirection

**Expected:**
- Redirects to `/admin` login page
- localStorage token is cleared
- Navbar shows "Admin Login" link

**Status:** ___________

### Test 1.4: Protected Route Access
**Steps:**
1. Clear localStorage (F12 → Application → localStorage)
2. Try to navigate to `/admin/dashboard`

**Expected:**
- Redirects to `/admin` login page
- Cannot access dashboard without login

**Status:** ___________

---

## TEST 2: Tournament CRUD ✅

### Test 2.1: Create Tournament
**Steps:**
1. Login as admin
2. Click "Add Tournament"
3. Fill form:
   - Name: "Test Cricket Tournament"
   - Sport: "Cricket"
   - Year: 2024
   - Location: "Test Stadium"
4. Click "Create Tournament"

**Expected:**
- Redirects to home page
- New tournament appears in list
- Shows tournament details

**Status:** ___________

### Test 2.2: View Tournament List
**Steps:**
1. Go to home page
2. View tournament cards

**Expected:**
- All tournaments display
- Shows name, year, sport type
- Shows champion if exists
- Has "Details" and "Bracket" buttons

**Status:** ___________

### Test 2.3: View Tournament Details
**Steps:**
1. From home, click "Details" on tournament
2. Observe tournament page

**Expected:**
- Shows tournament info
- Shows "Teams & Players" section
- No teams yet (shows "No teams registered")

**Status:** ___________

### Test 2.4: Delete Tournament
**Steps:**
1. (Setup: Create tournament)
2. Backend DELETE: `DELETE /api/tournaments/{id}`
3. Refresh page

**Expected:**
- Tournament removed from list
- API returns success message

**Status:** ___________

---

## TEST 3: Team CRUD ✅

### Test 3.1: Create Team
**Steps:**
1. Login as admin
2. Click "Add Team"
3. Select tournament from dropdown
4. Enter team name: "Phoenix Warriors"
5. Click "Add Team"

**Expected:**
- Redirects to home
- Team created in database
- No errors

**Status:** ___________

### Test 3.2: Create Multiple Teams
**Steps:**
1. Repeat Test 3.1 for 4 teams:
   - "Phoenix Warriors"
   - "Tiger Titans"
   - "Eagle Eagles"
   - "Lion Kings"

**Expected:**
- All 4 teams created
- All linked to same tournament

**Status:** ___________

### Test 3.3: View Teams on Tournament Details
**Steps:**
1. Go to tournament details
2. Scroll to "Teams & Players"

**Expected:**
- All 4 teams display
- Shows team names in cards
- Empty player sections

**Status:** ___________

### Test 3.4: Delete Team
**Steps:**
1. Backend DELETE: `DELETE /api/teams/{id}`
2. Refresh tournament details

**Expected:**
- Team removed from list
- Success message

**Status:** ___________

---

## TEST 4: Player CRUD ✅

### Test 4.1: Create Player
**Steps:**
1. Login as admin
2. Click "Add Player"
3. Select team: "Phoenix Warriors"
4. Name: "Virat Kohli"
5. Role: "Captain"
6. Photo: (leave blank or add URL)
7. Click "Add Player"

**Expected:**
- Player created
- No errors
- Returns to home

**Status:** ___________

### Test 4.2: Add Multiple Players
**Steps:**
1. Add 6 total players across teams:
   - Team 1: 2 players (1 captain, 1 player)
   - Team 2: 2 players
   - Team 3: 2 players
   - Team 4: 2 players

**Expected:**
- All players created
- Each has correct team and role

**Status:** ___________

### Test 4.3: View Players on Details
**Steps:**
1. Go to tournament details
2. Look at each team card

**Expected:**
- All players display in cards
- Shows name and role
- Grid layout with 2 per row

**Status:** ___________

### Test 4.4: Player Card Display
**Steps:**
1. View tournament details
2. Observe player cards

**Expected:**
- Shows player name
- Shows role (Captain, Player, etc)
- Formatted nicely

**Status:** ___________

### Test 4.5: Delete Player
**Steps:**
1. Backend DELETE: `DELETE /api/players/{id}`
2. Refresh page

**Expected:**
- Player removed from list
- No errors

**Status:** ___________

---

## TEST 5: Match CRUD ✅

### Test 5.1: Create Quarter-Final Matches
**Steps:**
1. Login as admin
2. Click "Add Match"
3. Create 4 QF matches:
   - Match 1: Team1 vs Team2 (no winner yet)
   - Match 2: Team3 vs Team4 (no winner yet)
   - Match 3: Team1 vs Team3 (no winner yet)
   - Match 4: Team2 vs Team4 (no winner yet)

**Expected:**
- All 4 matches created
- No errors
- Round set to "QF"

**Status:** ___________

### Test 5.2: View Matches on Bracket
**Steps:**
1. Go to tournament page
2. Click "Bracket" button
3. Look at "Quarter Finals" section

**Expected:**
- All 4 QF matches display
- Shows "Team A vs Team B"
- Shows "⏳ Match Pending"
- No winners showing

**Status:** ___________

### Test 5.3: Record Match Winners
**Steps:**
1. Click "Add Match" for each QF
2. Select same teams
3. Select round: "QF"
4. Select winner: Team1, Team3, Team1, Team2
5. Update/Create match

**Expected:**
- Winners recorded
- Matches updated in database

**Status:** ___________

### Test 5.4: View Winners on Bracket
**Steps:**
1. Go back to Bracket page
2. Refresh page (Ctrl+R)
3. Look at QF matches

**Expected:**
- Winners display in green boxes
- Shows "🏆 Winner: Team Name"

**Status:** ___________

### Test 5.5: Create Semi-Final Matches
**Steps:**
1. Create 2 SF matches with QF winners:
   - Match 1: Team1 vs Team3
   - Match 2: Team1 vs Team2

**Expected:**
- SF matches created
- Linked to correct tournament

**Status:** ___________

### Test 5.6: Create Final Match
**Steps:**
1. Record winners for SF matches
2. Create FINAL match:
   - Team with most wins vs other winner
3. Record final winner

**Expected:**
- Final match created
- Winner recorded

**Status:** ___________

### Test 5.7: View Complete Bracket
**Steps:**
1. Go to Bracket page
2. Observe all three round sections
3. Refresh to see auto-update (5 second polling)

**Expected:**
- All rounds display
- All matches show with winners
- Auto-refreshes every 5 seconds
- QF section shows 4 matches
- SF section shows 2 matches
- FINAL section shows 1 match with champion

**Status:** ___________

### Test 5.8: Delete Match
**Steps:**
1. Backend DELETE: `DELETE /api/matches/{id}`
2. Refresh bracket

**Expected:**
- Match removed from bracket
- No errors

**Status:** ___________

---

## TEST 6: Form Validation ✅

### Test 6.1: Tournament Form Validation
**Steps:**
1. Go to "Add Tournament"
2. Try submit with empty fields
3. Try submit with only name filled

**Expected:**
- Error message: "Please fill all required fields"
- Form does not submit
- No navigation

**Status:** ___________

### Test 6.2: Team Form Validation
**Steps:**
1. Go to "Add Team"
2. Don't select tournament
3. Try submit with team name only

**Expected:**
- Error message displays
- Form does not submit

**Status:** ___________

### Test 6.3: Match Form Validation
**Steps:**
1. Go to "Add Match"
2. Select same team for Team A and Team B
3. Try submit

**Expected:**
- Error: "Team A and Team B cannot be the same"

**Status:** ___________

---

## TEST 7: UI/UX ✅

### Test 7.1: Responsive Design - Desktop
**Steps:**
1. Open on desktop (1920px+)
2. Check layout
3. Click buttons

**Expected:**
- Everything visible
- No overlapping
- Proper spacing
- Buttons clickable

**Status:** ___________

### Test 7.2: Responsive Design - Tablet
**Steps:**
1. Open F12 (DevTools)
2. Toggle device toolbar
3. Select iPad/Tablet size
4. Navigate app

**Expected:**
- Navbar responsive
- Cards stack properly
- Forms readable
- Touch-friendly buttons

**Status:** ___________

### Test 7.3: Responsive Design - Mobile
**Steps:**
1. Toggle device toolbar
2. Select iPhone size
3. Navigate all pages

**Expected:**
- Hamburger menu appears
- Single column layout
- Readable text
- Buttons easy to tap

**Status:** ___________

### Test 7.4: Navigation
**Steps:**
1. Test all navigation links
2. Click between pages
3. Use browser back button

**Expected:**
- All links work
- Proper routing
- History works

**Status:** ___________

### Test 7.5: Loading States
**Steps:**
1. Add tournament (watch button)
2. Add team (watch button)

**Expected:**
- Button shows "Creating..." or similar
- Button disabled during request
- Loading completes

**Status:** ___________

### Test 7.6: Error Messages
**Steps:**
1. Trigger errors intentionally
2. Observe error display

**Expected:**
- Error messages visible
- Red text color
- Clear messaging
- Can dismiss/retry

**Status:** ___________

---

## TEST 8: Data Persistence ✅

### Test 8.1: Page Refresh Persistence
**Steps:**
1. Create tournament, team, player, match
2. Refresh page (Ctrl+R)
3. Go to tournament details

**Expected:**
- All data persists
- No data lost
- Everything still there

**Status:** ___________

### Test 8.2: Tab Switching Persistence
**Steps:**
1. Create tournament in Tab 1
2. Open same URL in Tab 2
3. Observe

**Expected:**
- Tournament visible in Tab 2
- Data synchronized

**Status:** ___________

### Test 8.3: Session Persistence
**Steps:**
1. Login to admin
2. Refresh page multiple times
3. Token should remain

**Expected:**
- Still logged in after refresh
- Token persists in localStorage
- No need to login again

**Status:** ___________

---

## TEST 9: API Calls ✅

### Test 9.1: Monitor Network Requests
**Steps:**
1. Open F12 → Network tab
2. Create tournament
3. Watch requests

**Expected:**
- POST /api/tournaments sent
- 200 response received
- Correct headers (Authorization)

**Status:** ___________

### Test 9.2: Check Request Headers
**Steps:**
1. Click tournament create
2. F12 → Network → Click POST request
3. Check Headers tab

**Expected:**
- Authorization: Bearer <token>
- Content-Type: application/json

**Status:** ___________

### Test 9.3: Check Response Data
**Steps:**
1. Create tournament
2. F12 → Network → POST request → Response tab

**Expected:**
- Response shows tournament object
- Has _id from MongoDB
- Has all fields

**Status:** ___________

---

## TEST 10: Error Scenarios ✅

### Test 10.1: 401 Unauthorized
**Steps:**
1. Remove token from localStorage
2. Try to create tournament (backend call)
3. Check response

**Expected:**
- 401 error
- Error message: "Unauthorized"
- Redirect to login

**Status:** ___________

### Test 10.2: 400 Bad Request
**Steps:**
1. Create match with missing required field
2. Check response

**Expected:**
- 400 error
- Error message about missing fields

**Status:** ___________

### Test 10.3: 404 Not Found
**Steps:**
1. Manually request: `/api/tournaments/invalid-id`
2. Check response

**Expected:**
- 404 error
- "Not found" message

**Status:** ___________

### Test 10.4: Network Error Handling
**Steps:**
1. Stop backend server
2. Try to load tournament details
3. Observe frontend behavior

**Expected:**
- Error message displays
- Does not crash
- Friendly error shown

**Status:** ___________

---

## TEST 11: Bracket Logic ✅

### Test 11.1: QF to SF Progression
**Steps:**
1. Create 4 QF matches with 4 teams
2. Record 2 winners
3. Create SF with winners

**Expected:**
- SF teams are QF winners
- Progression makes sense

**Status:** ___________

### Test 11.2: SF to Final Progression
**Steps:**
1. Record SF winners
2. Create Final match

**Expected:**
- Final has SF winners
- Proper progression

**Status:** ___________

### Test 11.3: Champion Display
**Steps:**
1. Record final winner
2. View tournament details

**Expected:**
- Champion displays at top
- 🥇 Winner: [Team Name]

**Status:** ___________

### Test 11.4: Bracket Auto-Update
**Steps:**
1. View bracket page
2. In another tab, update match result
3. Wait 5 seconds or refresh

**Expected:**
- Bracket updates automatically
- Or refreshes on manual refresh

**Status:** ___________

---

## TEST 12: Admin Features ✅

### Test 12.1: Quick Action Buttons
**Steps:**
1. Go to admin dashboard
2. Click each button:
   - Add Tournament
   - Add Team
   - Add Player
   - Add Match

**Expected:**
- Each navigates to correct form
- All forms load properly

**Status:** ___________

### Test 12.2: Logout from Dashboard
**Steps:**
1. Click logout button

**Expected:**
- Redirects to login
- Token cleared
- Session ends

**Status:** ___________

---

## Summary

**Total Tests:** 50+
**Passed:** _____ 
**Failed:** _____
**Skipped:** _____

**Overall Status:** ___________

---

## Known Issues / Notes

(Document any issues found)

1. ___________
2. ___________
3. ___________

---

## Recommendations

(Any improvements or fixes needed)

1. ___________
2. ___________
3. ___________

---

**Test Date:** ___________
**Tester:** ___________
**System:** ___________

**Sign-off:** ___________
