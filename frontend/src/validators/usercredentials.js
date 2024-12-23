import { z } from "zod";

export const userLogInSchema = z.object({
  email: z.string().min(1, "").email(" Invalid Email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long. ")
    .regex(
      /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/,
      "Password must contain at least one digit, one special character, and one letter"
    ),
});
export const userSignUpSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  email: z.string().min(1, "").email("Invalid Email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long. ")
    .regex(
      /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z])/,
      "Contain at least one digit, and one special character (!@#$%^&*)"
    ),
  profilePhoto: z
    .string()
    .refine(
      (value) => {
        const base64Regex =
          /^data:image\/(jpeg|jpg|png);base64,[A-Za-z0-9+/=]+$/;
        return base64Regex.test(value);
      },
      {
        message:
          "Only JPEG, JPG, and PNG images are allowed.",
      }
    )
    .refine(
      (value) => {
        const base64Size =
          (value.length * 3) / 4 -
          (value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0);
        return base64Size <= 5 * 1024 * 1024; // 5MB size limit
      },
      { message: " Image must be less than 5MB in size." }
    ),
});
