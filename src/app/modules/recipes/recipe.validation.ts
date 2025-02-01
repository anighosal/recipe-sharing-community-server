import { z } from "zod";

const createRecipeZodSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  releaseDate: z.string().min(1),
  ingredients: z.array(z.string()).nonempty("Ingredients are required"),
  formula: z.array(z.string()).nonempty("Formula is required"),
  category: z.string().nonempty("Category is required"),
  chefname: z.string().nonempty("Chef name is required"),
  timer: z.string().nonempty("Timer is required"),
  image: z.string().nonempty("Image URL is required"),
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
