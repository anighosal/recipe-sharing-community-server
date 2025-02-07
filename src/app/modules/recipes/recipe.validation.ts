import { z } from "zod";

export const createRecipeZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  releaseDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date format",
  }),
  ingredients: z.array(z.string()).min(1, "Ingredients are required"),
  formula: z.array(z.string()).min(1, "Formula steps are required"),
  category: z.string().min(1, "Category is required"),
  chefname: z.string().min(1, "Chef name is required"),
  image: z.string().min(1, "Image URL is required"),
  timer: z.string().optional(),
  viewCount: z.number().optional(),
  totalRating: z.number().optional(),
});

const updateRecipeZodSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  releaseDate: z.date().optional(),
});
export const RecipeValidation = {
  createRecipeZodSchema,
  updateRecipeZodSchema,
};
