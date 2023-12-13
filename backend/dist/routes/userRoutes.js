import { Router } from 'express';
import { getAllUsers, userSignup, userLogin, verifyUser, userLogout } from '../controllers/userControllers.js';
import { loginvalidator, signupvalidator, validate } from "../utils/valiators.js";
import { verifyToken } from '../utils/tokenManager.js';
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupvalidator), userSignup);
userRouter.post("/login", validate(loginvalidator), userLogin);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);
export default userRouter;
//# sourceMappingURL=userRoutes.js.map