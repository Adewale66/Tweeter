import { NextFunction, Request, Response } from "express";

const setCache = (req: Request, res: Response, next: NextFunction) => {
  const period = 60 * 60 * 24;
  if (req.method === "GET")
    res.set("Cache-Control", `public, max-age=${period}`);
  else res.set("Cache-Control", `no-store`);
  next();
};

export default setCache;
