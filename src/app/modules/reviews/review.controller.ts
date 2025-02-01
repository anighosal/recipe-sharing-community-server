/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { ReviewServices } from "./review.service";

const addReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const reviewData = req.body;
    const result = await ReviewServices.addReview(slug, reviewData);

    res.json({
      success: true,
      message: "Review is created successfully!",
      data: result,
    });
  }
);

// const getAllReviews = async (req: Request, res: Response) => {
//   try {
//     const result = await ReviewServices.getAllReviewsFromDB();
//     res.status(200).json({
//       success: true,
//       message: "Review is created successfully!",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "could not fetch reviews",
//       error: err,
//     });
//   }
// };

// const getReviewById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await ReviewServices.getSingleReviewFromDB(id);
//     if (!result) {
//       res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: "Review fetched successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch review",
//       error: err.message,
//     });
//   }
// };

// const updateReview = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await ReviewServices.getupdateReviewFromDB(id);
//     if (!result) {
//       res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: "Review fetched successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch review",
//       error: err.message,
//     });
//   }
// };
// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await ReviewServices.deleteReview(id);
//     if (!result) {
//       res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//       return;
//     }
//     res.status(200).json({
//       success: true,
//       message: "Review fetched successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch review",
//       error: err.message,
//     });
//   }
// };

export const ReviewControllers = {
  addReview,
  // getAllReviews,
  // getReviewById,
  // updateReview,
  // deleteReview,
};
