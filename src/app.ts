import cors from "cors";
// import router from "./app/routes";

import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

import notFound from "./app/middleware/notFound";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { RecipeRoutes } from "./app/modules/recipes/recipe.route";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/recipes", RecipeRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
