/* eslint-disable @typescript-eslint/no-explicit-any */

// import mongoose from "mongoose";
import { Recipe } from "../recipes/recipe.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const addReview = async (
  slug: string,
  reviewData: Partial<TReview>
): Promise<TReview | any> => {
  const session = await Recipe.startSession(); // Start session explicitly

  const recipe = await Recipe.findOne({ slug });

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  try {
    session.startTransaction(); // Start transaction

    // Create review within the session
    const review = await Review.create(
      [
        {
          recipe: recipe._id,
          ...reviewData,
        },
      ],
      { session }
    );

    // Count total reviews
    const reviewsCount = await Review.countDocuments({
      recipe: recipe._id,
    }).session(session);

    // ✅ Removed incorrect `throw new Error("Recipe not found");`

    // Update the total rating in the recipe document
    await Recipe.updateOne(
      { slug },
      { totalRating: reviewsCount },
      { session }
    );

    await session.commitTransaction(); // Commit transaction

    return review[0];
  } catch (error) {
    console.log(error);
    await session.abortTransaction(); // Rollback transaction on error
    throw error;
  } finally {
    session.endSession(); // Ensure session is always closed
  }
};

export const ReviewServices = {
  addReview,
};
