import jwt from "jsonwebtoken";

const getAccessToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
};

export default getAccessToken;
