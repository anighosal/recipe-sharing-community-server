import { Router } from "express";
import { RecipeRoutes } from "../modules/recipes/recipe.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/recipes",
    route: RecipeRoutes,
  },
  // {
  //   path: "/",
  //   route: facilityRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
