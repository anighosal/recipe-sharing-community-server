import { QueryBuilder } from "../../builder/QueryBuiler";
import { RecipeSearchableFields } from "./recipe.constant";
import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (payload: TRecipe) => {
  // const result = await Recipe.create(payload);
  const result = new Recipe(payload);

  const slug = result.createSlug(payload);
  result.slug = slug;
  await result.save();

  return result;
};

const getAllRecipesFromDB = async (payload: Record<string, unknown>) => {
  const recipeQuery = new QueryBuilder(Recipe.find({}), payload)
    .filter()
    .search(RecipeSearchableFields)
    .fields()
    .paginate()
    .sort();

  const result = await recipeQuery.modelQuery;
  return result;
};

const getRecipeBySlug = async (slug: string) => {
  const result = await Recipe.findOne({ slug });
  return result;
};
export const RecipeServices = {
  createRecipeIntoDB,
  getAllRecipesFromDB,
  getRecipeBySlug,
};
