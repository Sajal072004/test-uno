const { GoogleGenerativeAI } = require("@google/generative-ai");
const {json}  = require('body-parser');
const jwt = require('jsonwebtoken');

/**
 * Interacts with the Gemini AI API and returns the response.
 * @param {String} prompt - The text prompt to send to the Gemini AI.
 * @param {Object} req - The request object (used to extract the token from headers).
 * @returns {Promise<Object>} - The AI response.
 */
const interactWithGemini = async (req, prompt, prevMessages) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Authorization token is missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throw new Error("Invalid token");

    console.log("The prompt is:", prevMessages, prompt);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
      systemInstruction: `Reply only in JSON format with the key 'response'.Make sure first you will get the previous conversation of the user with the ai. The last message from the user is your prompt.Use previous messages as the context and give responses according to that.No dont return the context , simply reply the user with the answer of last question.Only answer what you know , like if user ask about tell me everything i told you about, only tell things you know , and dont say things you were not able to answer.Dont say that i dont know these things, only say what you know. Here you dont have to answer only based on context just make sure first see if the prompt is related to context , and if not then answer yourself.Please if someone ask about virat kohli and there is no context about virat kohli simply answer yourself , in this case virat kohli is an indian cricketer. By default answer in 50 - 60 words.`,
    });

    // Sanitize previous messages
    const sanitizeMessages = (messages) => {
      const uniqueMessages = [];
      const seen = new Set();

      messages.forEach((msg) => {
        const serializedMsg = `${msg.role}:${msg.content}`;
        if (!seen.has(serializedMsg)) {
          seen.add(serializedMsg);
          uniqueMessages.push(msg);
        }
      });

      return uniqueMessages;
    };
    const sanitizedMessages = sanitizeMessages(prevMessages);

    // Combine previous messages into a single string
    const formattedContext = sanitizedMessages
      .map((msg) => `${msg.role === 'You' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const finalPrompt = `${formattedContext} User: ${prompt}`;
    console.log("Final prompt sent to Gemini:", finalPrompt);

    if (!finalPrompt || typeof finalPrompt !== 'string') {
      throw new Error("Invalid finalPrompt. Ensure it is a non-empty string.");
    }
    console.log("processing the result");

    const result = await model.generateContent(finalPrompt );
    console.log("The result from Gemini is:", result);

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
