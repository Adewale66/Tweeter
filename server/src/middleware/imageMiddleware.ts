import { validateMIMEType } from "validate-image-type";

const validateTweetImage = async (req, res, next) => {
  if (req.file) {
    const validateResult = await validateMIMEType(req.file.path, {
      originalFilename: req.file.originalname,
      allowMimeTypes: ["image/jpeg", "image/png"],
    });
    console.log("validated", validateResult);
    if (!validateResult.ok)
      return res.status(400).json({ message: "Invalid image type" });
    next();
  } else next();
};

export { validateTweetImage };
