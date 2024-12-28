const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

/**
 * Decodes the JWT token and retrieves the userId.
 * @param {Object} req - The request object (used to extract token from headers).
 * @returns {Number} - The decoded userId.
 */
const decodeToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    throw new Error("Authorization token is missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    return decoded.userId; // Assuming your token contains userId
  } catch (error) {
    console.error("Error decoding token:", error.message);
    throw new Error("Invalid token");
  }
};

/**
 * Creates a new empty chat session for a user.
 * @param {Object} req - The request object (used to extract the userId from token).
 * @returns {Object} - The created empty chat session.
 */
const createEmptyChat = async (req) => {
  try {
    // Get userId from the decoded token
    const userId = decodeToken(req);

    // Create a new empty chat session
    const chat = await prisma.chat.create({
      data: {
        userId, 
        title,
        messages: [],
      },
    });

    return chat;
  } catch (error) {
    console.error("Error creating empty chat:", error.message);
    throw new Error("Failed to create empty chat");
  }
};

const createChat = async (data, req) => {
  try {
    const userId = decodeToken(req); // Get userId from decoded token
    const { chatId, userMessage, aiMessage, userImage, aiImage, title } = data;

    console.log("Decoded userId:", userId);  // Debugging line to check userId
    console.log("Received chatId:", chatId);  // Debugging line to check chatId
    console.log("User message:", userMessage);  // Debugging line

    if (!chatId) {
      console.log("No chatId provided, creating new chat...");  // Debugging line
      const newChat = await prisma.chat.create({
        data: {
          userId, // Associate the chat with the logged-in user
          title,
          messages: [], // Start with an empty messages array
        },
      });
      return { chatId: newChat.id , title: newChat.title}; // Return the new chatId
    }

    // If chatId is provided, find the existing chat session by chatId
    console.log("Looking for existing chat with chatId:", chatId);  // Debugging line
    let chat = await prisma.chat.findUnique({
      where: { id: Number(chatId) },
      select: {
        id: true,
        messages: true, // Directly select the messages JSON field
        userId: true, // Select userId to compare with the logged-in user
      },
    });

    // Check if chat exists
    if (!chat) {
      throw new Error("Chat session not found");
    }

    console.log("Chat userId:", chat.userId); // Debugging line to check chat's userId

    // Check if the user is authorized to modify this chat session
    if (chat.userId !== userId) {
      throw new Error("Unauthorized action");
    }

    // Append new messages to the existing messages array (JSON type)
    const updatedMessages = [
      ...chat.messages,
      { role: "user", content: userMessage, image: userImage },
      { role: "ai", content: aiMessage, image: aiImage }
    ];

    // Update the chat session with new messages
    chat = await prisma.chat.update({
      where: { id: Number(chatId) },
      data: {
        messages: updatedMessages, // Update the messages JSON field
      },
      select: {
        id: true,
        messages: true, // Select messages again after update
        title:true,
      },
    });

    return chat;
  } catch (error) {
    console.error("Error creating or updating chat:", error.message);
    throw new Error("Failed to create or update chat");
  }
};


/**
 * Get all chats for a specific user.
 * @param {Object} req - The request object (used to extract the userId from token).
 * @returns {Array} - A list of the user's chat sessions.
 */
const getChatsByChatId = async (chatId, req) => {
  try {
    // Decode the userId from the token (do this in the service)
    const userId = decodeToken(req); 

    // Fetch the chat based on the chatId and userId
    const chat = await prisma.chat.findUnique({
      where: {
        id: Number(chatId),
        userId: userId,  
      },
    });

    if (!chat) {
      throw new Error("Chat not found or unauthorized");
    }

    return chat;
  } catch (error) {
    console.error("Error in service fetching chat:", error.message);
    throw error;  // Throw the error to be caught in the controller
  }
};



/**
 * Deletes a chat session based on the chatId.
 * @param {Number} chatId - The ID of the chat to delete.
 * @param {Object} req - The request object (used to extract the userId from token).
 * @returns {Object} - The deleted chat details or an error if unauthorized.
 */
const deleteChat = async (chatId, req) => {
  try {
    const userId = decodeToken(req); // Get userId from the decoded token

    // Find the chat to ensure it exists and belongs to the user
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      throw new Error("Chat not found");
    }

    if (chat.userId !== userId) {
      throw new Error("Unauthorized action");
    }

    // Delete the chat
    const deletedChat = await prisma.chat.delete({
      where: { id: chatId },
    });

    return deletedChat;
  } catch (error) {
    console.error("Error deleting chat:", error.message);
    throw new Error("Failed to delete chat");
  }
};

/**
 * Fetches all chats of a user, returning only the chat IDs.
 * @param {Object} req - The request object (used to extract the userId from token).
 * @returns {Array} - A list of chat IDs belonging to the user.
 */
const getAllChats = async (req) => {
  try {
    const userId = decodeToken(req); // Get userId from the decoded token
    console.log("Decoded userId:", userId); // Debugging
    if (!userId) {
      throw new Error("Invalid token or userId not found.");
    }

    // Fetch all chats for the user, only selecting the `id`
    const chats = await prisma.chat.findMany({
      where: { userId: userId }
      
    });
    console.log("Fetched chats:", chats); // 
    return chats;
  } catch (error) {
    console.error("Error fetching all chats:", error.message);
    throw new Error("Failed to fetch chats");
  }
};


module.exports = {
  getAllChats,
  deleteChat,
  createEmptyChat,
  createChat,
  getChatsByChatId,
};

