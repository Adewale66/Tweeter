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

const registerApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many register attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: true,
  skipSuccessfulRequests: true,
});

const createTweetApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: "Rate limit exceeded, please try again after a while",
  standardHeaders: true,
  legacyHeaders: true,
  skipFailedRequests: true,
});

const updateTweetApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 70,
  message: "Rate limit exceeded, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: true,
  skipFailedRequests: true,
});

export {
  loginApiLimiter,
  registerApiLimiter,
  createTweetApiLimiter,
  updateTweetApiLimiter,
};
