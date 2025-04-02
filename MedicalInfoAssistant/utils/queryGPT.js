import axios from 'axios';

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

export async function queryGPT(transcript) {
  const prompt = `
You are a helpful medical assistant. Based on the following user question, do the following:

1. Identify the type of surgery mentioned (e.g., "ACL surgery", "rotator cuff repair").
2. Identify the user's intent (e.g., "exercises", "precautions", "rehabilitation", "pain", "diet", etc.).
3. Provide a short, accurate, patient-friendly answer based on known medical knowledge or trusted sources.
4. If needed, suggest where more info can be found (e.g., Mayo Clinic, WebMD).

User question:
"${transcript}"

Respond in this JSON format:
{
  "procedure": "...",
  "intent": "...",
  "response": "..."
}
`;

  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = res.data.choices[0].message.content;
    return JSON.parse(reply); // try/catch just in case parsing fails
  } catch (err) {
    console.error('GPT Query Error:', err.response?.data || err.message);
    throw err;
  }
}
