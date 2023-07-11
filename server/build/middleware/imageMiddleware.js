"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTweetImage = void 0;
const validate_image_type_1 = require("validate-image-type");
const validateTweetImage = async (req, res, next) => {
    if (req.file) {
        const validateResult = await (0, validate_image_type_1.validateMIMEType)(req.file.path, {
            originalFilename: req.file.originalname,
            allowMimeTypes: ["image/jpeg", "image/png"],
        });
        console.log("validated", validateResult);
        if (!validateResult.ok)
            return res.status(400).json({ message: "Invalid image type" });
        next();
    }
    else
        next();
};
exports.validateTweetImage = validateTweetImage;
//# sourceMappingURL=imageMiddleware.js.map