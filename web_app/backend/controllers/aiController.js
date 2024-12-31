const { interactWithGemini, interactWithGeminiWithoutLogin } = require("../services/aiService.js");

/**
 * Controller to handle chat requests to Gemini AI.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const sendMessageToGemini = async (req, res) => {
  const { prompt , prevMessages } = req.body;
  console.log("the prompt is ", prompt);
  console.log("the prev messages are ", prevMessages);

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required",
    });
  }

  try {
    const aiResponse = await interactWithGemini(req, prompt, prevMessages);
    console.log("the response from ai is " , aiResponse);

    // Respond with the AI response
    res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.log("error in controller ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendMessageToGeminiWithoutLogin = async (req, res) => {
  const { prompt } = req.body;
  console.log("the prompt is ", prompt);

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required",
    });
  }

  try {
    const aiResponse = await interactWithGeminiWithoutLogin(req, prompt);
    console.log("the response from ai is " , aiResponse);

    res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.log("error in controller ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessageToGemini,
  sendMessageToGeminiWithoutLogin
};
