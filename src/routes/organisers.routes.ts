import { Router } from "express";
import { LoginSchema } from "../schemas/login.schema";
import { OrganiserPostSchema, OrganiserUpdateSchema } from "../schemas/organiser.schema";
import { Validate } from "../validators/schemas.validator";
import { LoginOrganiser } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CreateOrganiser, GetOrganiser, GetOrganisers, UpdateOrganiser, DeleteOrganiser } from "../controllers/organisers.controller";

const route = Router();

route.post("/login", Validate(LoginSchema), LoginOrganiser);

route.post("/createOrganiser", Validate(OrganiserPostSchema), CreateOrganiser);

route.get("/getOrganiser", AuthMiddleware, GetOrganiser);

route.get("/getOrganisers", GetOrganisers);

route.patch("/updateOrganiser", Validate(OrganiserUpdateSchema), AuthMiddleware, UpdateOrganiser);

route.delete("/deleteOrganiser", AuthMiddleware, DeleteOrganiser);

export default route;
