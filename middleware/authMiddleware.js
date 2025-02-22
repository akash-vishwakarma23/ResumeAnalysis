const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ error: "Invalid token format. Use 'Bearer <token>'." });
    }

    const token = tokenParts[1];

    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ error: "Invalid token." });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Unexpected Error in verifyToken:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = verifyToken;
