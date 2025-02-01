import { ObjectId } from "mongoose";

export type TReview = {
  recipe: ObjectId;
  email: string;
  rating: number;
  comment: string;
  upvote: number;
  downvote: number;
  follow: boolean;
  image: string;
};
