import ratelimit from "../config/upstash.js";

const ratelimitter = async (req, res, next) => {
  try {
    const clientIP = req.ip;

    const { success } = await ratelimit.limit(clientIP);

    if (!success) {
      return res.status(429).json({
        message: "Too many request, please try again later",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default ratelimitter;
