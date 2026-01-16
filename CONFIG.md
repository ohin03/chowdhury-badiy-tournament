# ⚙️ Configuration Summary

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/khelaDB
JWT_SECRET=khela_secret_123
```

**Important**: Change `JWT_SECRET` in production!

## Database

### MongoDB Connection
- **Local**: `mongodb://127.0.0.1:27017/khelaDB`
- **Cloud**: Use Atlas URI and update MONGO_URI

### Collections
- admins
- tournaments
- teams
- players
- matches

## API Configuration

### Base URLs
- **Backend API**: `http://localhost:5000/api`
- **Frontend**: `http://localhost:3001`

### CORS Settings
Backend accepts requests from:
- `http://localhost:3000`
- `http://localhost:3001`
- Any origin (in dev mode)

## Authentication

### Default Admin Account
- **Username**: `admin`
- **Password**: `1234`

### JWT Token
- **Stored in**: `localStorage` as `token`
- **Format**: `Bearer <token>`
- **Header**: `Authorization: Bearer <token>`

### Token Generation
```javascript
// Backend generates token like this:
const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
```

## Development Tools

### Required
- Node.js v14+
- npm v6+
- MongoDB 4.0+

### Optional
- MongoDB Compass (GUI for MongoDB)
- Postman (API testing)
- VS Code (editor)

## Scripts

### Backend
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Frontend
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## Dependencies

### Backend
```
express: ^5.2.1
mongoose: ^9.0.2
bcryptjs: ^3.0.3
jsonwebtoken: ^9.0.3
cors: ^2.8.5
dotenv: ^17.2.3
nodemon: ^3.1.11 (dev)
```

### Frontend
```
react: ^18.2.0
react-dom: ^18.2.0
react-router-dom: ^6.x
axios: ^1.6.x
bootstrap: ^5.x
```

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Frontend | 3001 | http://localhost:3001 |
| MongoDB | 27017 | mongodb://127.0.0.1:27017 |

## File Structure Summary

### Backend Routes
```
/api/auth          - Authentication
/api/tournaments   - Tournament CRUD
/api/teams         - Team CRUD
/api/players       - Player CRUD
/api/matches       - Match CRUD
```

### Frontend Routes
```
/                      - Home page (tournament list)
/tournament/:id        - Tournament details
/bracket/:id           - Tournament bracket
/admin                 - Admin login
/admin/dashboard       - Admin panel
/admin/tournament      - Create tournament
/admin/team            - Create team
/admin/player          - Create player
/admin/match           - Create match
```

## Security Features

1. **Authentication**
   - JWT tokens
   - Password hashing with bcryptjs
   - Protected routes

2. **Authorization**
   - Admin middleware for protected endpoints
   - Token validation

3. **CORS**
   - Cross-origin requests enabled
   - Controlled origins

4. **Input Validation**
   - Required field validation
   - Type checking
   - Error messages

## Performance Optimizations

1. **Frontend**
   - React hooks for state management
   - Lazy loading components
   - Auto-polling for bracket (5s interval)
   - Error boundaries

2. **Backend**
   - Database indexing
   - Population of references
   - Efficient queries
   - Error handling middleware

3. **Database**
   - ObjectId references
   - Timestamps
   - Proper schema design

## Deployment Checklist

- [ ] Update JWT_SECRET in .env
- [ ] Change admin password
- [ ] Configure production MongoDB URI
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for production domain
- [ ] Setup environment variables securely
- [ ] Run npm run build for frontend
- [ ] Set up proper error logging
- [ ] Configure backup strategy
- [ ] Setup monitoring and alerts

## Monitoring & Debugging

### Backend Logs
- Server startup messages
- Database connection status
- Request/response logging (can be added)
- Error stack traces

### Frontend Console
- Component lifecycle logs
- API request/response logging
- Authentication state changes
- Error messages

### MongoDB
```bash
# Monitor connections
db.currentOp()

# Check indexes
db.tournaments.getIndexes()

# View stats
db.tournaments.stats()
```

## Troubleshooting Configuration

### MongoDB Connection
```javascript
// If connection fails, check:
1. MongoDB is running: mongosh
2. MONGO_URI is correct
3. Database exists
4. Network access is allowed
```

### JWT Issues
```javascript
// If token fails validation:
1. JWT_SECRET matches what was used to generate
2. Token hasn't expired
3. Token format is correct (Bearer prefix)
4. Token is stored in localStorage
```

### CORS Issues
```javascript
// If CORS errors occur:
1. Backend CORS is configured
2. Frontend API baseURL is correct
3. Correct headers are sent
4. Browser cache is cleared
```

## Backup & Recovery

### MongoDB Backup
```bash
# Backup
mongodump --db khelaDB --out /backup/

# Restore
mongorestore --db khelaDB /backup/khelaDB/
```

### Code Backup
```bash
git init
git add .
git commit -m "Initial commit"
```

## Version Compatibility

- **MongoDB**: 4.0+ recommended
- **Node.js**: 14.0.0+ recommended  
- **React**: 17.0.0+
- **Express**: 4.0+

## Additional Resources

- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- React Docs: https://react.dev/
- JWT Docs: https://jwt.io/

---

**Last Updated**: December 25, 2025
