import { body, validationResult } from 'express-validator'

export const loginValidator = [
  body("email")
    .exists().withMessage("Email is Required").bail()
    .isString().withMessage("Email must be a String Value").bail()
    .trim()
    .isEmail().withMessage("Enter a valid email address"),
  body("password")
    .exists().withMessage("Password is required").bail()
    .isString().withMessage("Password must be a String value").bail()
    .trim()
    .isLength({ min: 6 }).withMessage("Password at least 6 character long"),
    
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.array()
      })
    }

    next()

  }

]
