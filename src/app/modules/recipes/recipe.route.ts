import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ReviewControllers } from "../reviews/review.controller";
import { ReviewValidation } from "../reviews/review.validation";
import { RecipeControllers } from "./recipe.controller";
import { RecipeValidation } from "./recipe.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(RecipeValidation.createRecipeZodSchema),
  RecipeControllers.createRecipe
);
router.get("/", RecipeControllers.getAllRecipes);
router.get("/:slug", RecipeControllers.getRecipeBySlug);
router.post(
  "/:slug/review",
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewControllers.addReview
);
// router.get("/:id/reviews", ReviewControllers.getAllReviews);
// router.put("/:id/review", ReviewControllers.getReviewById);
// router.delete("/:id/review", ReviewControllers.deleteReview);

export const RecipeRoutes = router;
