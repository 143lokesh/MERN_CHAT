import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(422).json({
            errors: errors.array(),
        });
    };
};
export const loginvalidator = [
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({ min: 8 }).withMessage("password is required of min 8 characters"),
];
export const signupvalidator = [
    body("name").notEmpty().withMessage("name is required"),
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({ min: 8 }).withMessage("password is required of min 8 characters"),
];
export const chatCompletionvalidator = [
    body("message").notEmpty().withMessage("message is required"),
];
//# sourceMappingURL=valiators.js.map