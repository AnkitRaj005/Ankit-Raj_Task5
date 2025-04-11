const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No authentication token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
  
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = auth;
