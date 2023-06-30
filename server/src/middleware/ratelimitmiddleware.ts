import rateLimit from "express-rate-limit";

const loginApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: true,
  skipSuccessfulRequests: true,
});

export { loginApiLimiter };
