const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateReply = async (promptText) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(promptText);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error.message);
        throw new Error('Failed to generate AI response');
    }
};
