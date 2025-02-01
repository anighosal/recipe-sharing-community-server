import httpStatus from "http-status";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";

const notFound = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: err.message || "Not Found",
  });
};

export default notFound;
