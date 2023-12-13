import {Router} from 'express';
import { verifyToken } from '../utils/tokenManager.js';
import { chatCompletionvalidator, validate } from '../utils/valiators.js';
import { generateChatCompletion,sendChatsToUser,deleteChats } from '../controllers/ChatControllers.js';
//protexted api
const chatRouter= Router();
chatRouter.post("/new",validate(chatCompletionvalidator),verifyToken,generateChatCompletion)
chatRouter.get("/all-chats", verifyToken, sendChatsToUser);
chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;