const express = require("express");
const { sendMessageToGemini, sendMessageToGeminiWithoutLogin } = require("../../controllers/aiController.js");
const {
  createChat,
  getChatsByChatId,
  deleteChat,
  getAllChats
} = require("../../controllers/chatController.js");

const router = express.Router();

// Route for interacting with Gemini AI
router.post("/chat/ai", sendMessageToGemini);
router.post("/chat/ai-unauthorised" , sendMessageToGeminiWithoutLogin);

router.post("/chats", createChat);
router.get("/chats/chat/:chatId", getChatsByChatId);
router.delete('/chats/:chatId', deleteChat);
router.get("/chats/all" , getAllChats);


module.exports = router;
