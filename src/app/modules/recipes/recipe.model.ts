import { format } from "date-fns";
import { model, Schema } from "mongoose";
import slugify from "slugify";
import { TRecipe, TRecipeMethods, TRecipeModel } from "./recipe.interface";

// const reviewSchema = new Schema<TReview>({
//   email: { type: String, required: true },
//   rating: { type: Number, required: true, min: 1, max: 5 },
//   comment: { type: String, required: true },
//   upvote: { type: Number, default: 0 },
//   downvote: { type: Number, default: 0 },
//   follow: { type: Boolean, default: false },
//   image: { type: String, required: false },
// });

const recipeSchema = new Schema<TRecipe, TRecipeModel, TRecipeMethods>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    ingredients: { type: [String], required: true },
    formula: { type: [String], required: true },
    category: { type: String, required: true },
    chefname: { type: String, required: true },
    timer: { type: String, required: true },
    viewCount: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    image: { type: String, required: true },

    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

recipeSchema.method("createSlug", function createSlug(payload: TRecipe) {
  if (!payload.releaseDate || isNaN(new Date(payload.releaseDate).getTime())) {
    throw new Error("Invalid or missing release date");
  }
  const date = format(new Date(payload.releaseDate), "dd-MM-yyyy");

  const slug = slugify(`${payload.title}-${date}}`, {
    lower: true,
  });

  return slug;
});

export const Recipe = model<TRecipe, TRecipeModel>("Recipe", recipeSchema);
