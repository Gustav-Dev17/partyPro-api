import { Router } from "express";
import { GetCategories } from "../controllers/utils.controller";

const route = Router();

route.get("/getCategories", GetCategories);

export default route;
