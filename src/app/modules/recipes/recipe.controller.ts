/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { RecipeServices } from "./recipe.service";

const createRecipe = async (req: Request, res: Response) => {
  const recipeData = req.body;
  const result = await RecipeServices.createRecipeIntoDB(recipeData);

  res.json({
    success: true,
    message: "Recipe is created successfully!",
    data: result,
  });
};
const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const result = await RecipeServices.getAllRecipesFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Recipe is created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "could not fetch recipes",
      error: err,
    });
  }
};

const getRecipeBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await RecipeServices.getRecipeBySlug(slug);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Recipe fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch recipe",
      error: err.message,
    });
  }
};

export const RecipeControllers = {
  createRecipe,
  getAllRecipes,
  getRecipeBySlug,
};
