import { z } from "zod";

const createReviewZodSchema = z.object({
  email: z.string().email("Invalid email format"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters long"),
  upvote: z.number().int().min(0, "Upvote count cannot be negative"),
  downvote: z.number().int().min(0, "Downvote count cannot be negative"),
  follow: z.boolean(),
  image: z.string().url("Invalid image URL"),
});

const updateReviewSchema = z.object({
  rating: z.number().min(0).max(5).optional(),
  comment: z.string().min(1).optional(),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewSchema,
};
