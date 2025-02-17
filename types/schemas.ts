import {z} from "zod";

export const ContactUsFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {message: "First name should be greater than 2 characters"})
    .max(50, {message: "First name can't exceed 50 characters"}),
  lastName: z
    .string()
    .min(2, {message: "Last name should be greater than 2 characters"})
    .max(50, {message: "Last name can't exceed 50 characters"}),
  email: z
    .string()
    .min(1, "Email can't be empty")
    .email({message: "Invalid email"}),
  phone: z
    .string()
    .trim()
    .min(8, {message: "Invalid Phone number"})
    .max(10, {message: "Invalid Phone number"})
    .refine((value) => {
      const regEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
      return regEXP.test(value);
    }, "Invalid Phone number"),
  message: z
    .string()
    .min(1, {message: "Type the message you want to convey to the team."}),
  countryCode: z.string(),
});