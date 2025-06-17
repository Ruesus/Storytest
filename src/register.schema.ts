import z from "zod";

export const registerSchema = z
  .object({
    username: z.string(),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 chars length" }),
    confirmPassword: z.string(),
    age: z.preprocess(
      (age) => parseInt(z.string().parse(age), 10),
      z.number().min(18, { message: "You must be at least 18 years old" })
    ) as z.ZodEffects<z.ZodNumber, number, number>,
  })
  .superRefine((arg) => {
    return arg.confirmPassword === arg.password;
  });
export type RegisterRequest = z.infer<typeof registerSchema>;
