import { Router } from "express";
import { LoginSchema } from "../schemas/login.schema";
import { EventPostSchema } from "../schemas/event.schema";
import { Validate } from "../validators/schemas.validator";
import { LoginOrganiser } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const route = Router();

// route.post("/login", Validate(LoginSchema), LoginOrganiser);

// route.post("/createOrganiser", Validate(OrganiserSchema), CreateOrganiser);

// route.get("/getOrganiser", AuthMiddleware, GetOrganiser);

// route.get("/getOrganisers", GetOrganisers);

// route.patch("/updateOrganiser", AuthMiddleware, UpdateOrganiser);

// route.delete("/deleteOrganiser", DeleteOrganiser);

export default route;
