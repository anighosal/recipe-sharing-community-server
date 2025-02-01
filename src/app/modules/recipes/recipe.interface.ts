import { Model } from "mongoose";
export type TRecipe = {
  title: string;
  description: string;
  releaseDate: Date;
  ingredients: string[];
  formula: string[];
  category: string;
  chefname: string;
  timer: string;
  viewCount: number;
  totalRating: number;
  image: string;
  isDeleted?: number;
  slug: string;
};

export type TRecipeMethods = {
  createSlug(payload: TRecipe): string;
};

export type TRecipeModel = Model<
  TRecipe,
  Record<string, unknown>,
  TRecipeMethods
>;
