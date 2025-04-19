const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAiRecommendation = async (req, res) => {
  try {
    const prompt = `
Suggest a single, real book that is critically acclaimed and engaging. Respond in this format:

{
  "title": "Book Title",
  "author": "Author Name",
  "reason": "One compelling sentence why it's worth reading."
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
    });

    const aiText = response.choices[0].message.content;
    const suggestion = JSON.parse(aiText);

    res.json(suggestion);
  } catch (error) {
    console.error('❌ AI Suggestion Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendation' });
  }
};

module.exports = { getAiRecommendation };