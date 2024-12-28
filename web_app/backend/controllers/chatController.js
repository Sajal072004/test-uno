const chatService = require('../services/chatService.js');

/**
 * Creates a new chat session or appends messages to an existing chat session by calling the Chat Service.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const createChat = async (req, res) => {
  const { chatId, userMessage, aiMessage, userImage, aiImage, applianceId , title} = req.body;

  try {
   
    let chat;
    
    // Call service to create or update the chat
    chat = await chatService.createChat({
      userMessage,
      aiMessage,
      userImage,
      aiImage,
      applianceId,
      chatId,
      title: title || "Untitled Chat"
    }, req);  

    if (chat) {
      return res.status(201).json({
        message: "Chat session created or updated successfully.",
        chat,
      });
    }

    // If no chat is returned, send an error message
    return res.status(400).json({
      error: "Failed to create or update chat session.",
    });

  } catch (error) {
    console.error("Error creating or updating chat:", error.message);
    return res.status(500).json({
      error: "Failed to create or update chat session",
    });
  }
};

/**
 * Fetches all chats for a user or a specific chat based on chatId by calling the Chat Service.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */

const getChatsByChatId = async (req, res) => {
  const { chatId } = req.params;  // Extract chatId from request params

  try {
    console.log("Received chatId in controller:", chatId);

    if (!chatId || isNaN(chatId)) {  // Validate if chatId is a number
      return res.status(400).json({
        error: "Invalid chatId provided. It must be a number.",
      });
    }

    // Fetch the chat using the service
    const chat = await chatService.getChatsByChatId(chatId, req);

    return res.status(200).json({
      message: "Chat fetched successfully.",
      chat,
    });
  } catch (error) {
    console.error("Error in controller fetching chat:", error.message);

    // Handle specific error messages (e.g., not found or unauthorized)
    if (error.message === "Chat not found or unauthorized") {
      return res.status(404).json({
        error: "Chat not found or you do not have access to it.",
      });
    }

    // General server error fallback
    return res.status(500).json({
      error: "Failed to fetch chat. Please try again later.",
    });
  }
};
/**
 * Deletes a chat session by chatId by calling the Chat Service.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    if (isNaN(chatId)) {
      return res.status(400).json({ error: "Invalid chatId provided." });
    }

    const deletedChat = await chatService.deleteChat(Number(chatId), req);

    return res.status(200).json({
      message: "Chat deleted successfully.",
      deletedChat,
    });
  } catch (error) {
    console.error("Error deleting chat:", error.message);
    return res.status(500).json({
      error: "Failed to delete chat",
    });
  }
};

/**
 * Fetches all chats for a user by calling the Chat Service.
 * Only returns the chat IDs.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
const getAllChats = async (req, res) => {
  try {
    
    const chats = await chatService.getAllChats(req);
    console.log("the chats in the controller are ", chats);
    return res.status(200).json({"chats" : chats});
  } catch (error) {
    console.error("Error fetching all chats:", error.message);
    throw new Error("Failed to fetch chats");
  }
};

module.exports = {
  getAllChats,
  createChat,
  getChatsByChatId,
  deleteChat,
};

