import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res
    .status(statusCode)
    .cookie(user.role === "Admin" ? "adminToken" : "patientToken", token, {
      httpOnly: true,
      secure: true, // HTTPS only
      sameSite: "none", // important for cross-site (Netlify frontend → Render backend)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user: { id: user._id, name: user.firstName, role: user.role },
    });
};
