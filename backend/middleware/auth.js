import jwt from "jsonwebtoken";

/**
 * Admin Authentication Middleware
 * Validates JWT token and extracts admin information
 * Rejects requests without valid tokens with 401 status
 */
export default function authMiddleware(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        msg: "No authorization token provided",
        code: "NO_TOKEN" 
      });
    }

    // Extract token (remove "Bearer " prefix if present)
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.slice(7) 
      : authHeader;

    // Verify token with JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach admin info to request for use in controllers
    req.admin = decoded;
    
    // Continue to next middleware/route
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        msg: "Token has expired. Please login again.",
        code: "TOKEN_EXPIRED" 
      });
    }
    
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        msg: "Invalid or tampered token",
        code: "INVALID_TOKEN" 
      });
    }

    return res.status(401).json({ 
      msg: "Authentication failed",
      code: "AUTH_FAILED",
      error: err.message 
    });
  }
}
