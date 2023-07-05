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
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 50,
  message: "Rate limit exceeded, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: true,
  skipFailedRequests: true,
});

const followUserApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: "Too many follow attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: true,
  skipFailedRequests: true,
});

const updateProfileApiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  message:
    "Too many profile update attempts, please try again after 10 minutes",
  standardHeaders: true,
  legacyHeaders: true,
  skipFailedRequests: true,
});

export {
  loginApiLimiter,
  registerApiLimiter,
  createTweetApiLimiter,
  updateTweetApiLimiter,
  updateProfileApiLimiter,
  followUserApiLimiter,
};
