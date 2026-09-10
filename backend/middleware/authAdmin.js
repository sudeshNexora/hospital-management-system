import jwt from "jsonwebtoken";

// Admin Authentication Middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Unauthorized Access denied",
      });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.role !== "admin"
    ) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
