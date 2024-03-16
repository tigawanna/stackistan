import { z } from "zod";

export const createStackistanUserSchema = z.object({
  username: z.string().optional(),
  email: z.string(),
  emailVisibility: z.boolean().optional(),
  password: z.string(),
  passwordConfirm: z.string(),
  verified: z.boolean().optional(),
  name: z.string(),
  github_access_token: z.string().optional(),
  google_access_token: z.string().optional(),
  bio: z.string().optional(),
  avatar_url: z.string().url().optional(),
  cover_image_url: z.string().url(),
  skills: z.string().optional(),
  github_username: z.string().optional(),
  linkedin_username: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
});
