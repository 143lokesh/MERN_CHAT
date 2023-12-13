import {Router} from 'express';
import userRouter from './userRoutes.js';
import chatRouter from './chatRoutes.js';
const router= Router();

router.use("/user",userRouter);
router.use("/chat",chatRouter);
//ve4qFM5CfUCkCCTK
export default router;