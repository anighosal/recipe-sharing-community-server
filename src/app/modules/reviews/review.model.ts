import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  follow: { type: Boolean, default: false },
  image: { type: String, required: false },
});

export const Review = model<TReview>("Review", reviewSchema);
