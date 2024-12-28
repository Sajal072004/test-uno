const { GoogleGenerativeAI } = require("@google/generative-ai");
const {json}  = require('body-parser');
const jwt = require('jsonwebtoken');

/**
 * Interacts with the Gemini AI API and returns the response.
 * @param {String} prompt - The text prompt to send to the Gemini AI.
 * @param {Object} req - The request object (used to extract the token from headers).
 * @returns {Promise<Object>} - The AI response.
 */
const interactWithGemini = async (req, prompt) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Validate the token (you can perform your validation here, e.g., JWT validation)
    // For example, using jwt.verify if you use JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throw new Error("Invalid token");

    console.log("the prompt is " , prompt);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
      systemInstruction: `Here listen return the data in a json with the key response. Never mention that you are an AI model. If the request is unrelated and contains violent words , simply say i cant answer that as it is against the policies`,
    });

    
    const result = await model.generateContent(prompt);
    console.log("the result from gemini is ",result );

    return result.response.text();
  } catch (error) {
    console.error("Error interacting with Gemini AI:", error.message);
    throw new Error("Failed to interact with Gemini AI");
  }
};


const interactWithGeminiWithoutLogin = async (req, prompt) => {
  try {



    console.log("the prompt is " , prompt);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
      systemInstruction: `Here listen return the data in a json with the key response. Never mention that you are an AI model. If the request is unrelated and contains violent words , simply say i cant answer that as it is against the policies. Also give the answer under 100 words , and ask user that if they want detailed answer , please login.`,
    });

    
    const result = await model.generateContent(prompt);
    console.log("the result from gemini is ",result );

    return result.response.text();
  } catch (error) {
    console.error("Error interacting with Gemini AI:", error.message);
    throw new Error("Failed to interact with Gemini AI");
  }
};

module.exports = {
  interactWithGemini,
  interactWithGeminiWithoutLogin
};
