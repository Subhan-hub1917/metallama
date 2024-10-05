import express from 'express';
import { config } from 'dotenv';
// import fetch from 'node-fetch'; 

config({
    path: "./config/config.env"
});

const app = express();
app.use(express.json());

app.post('/api/v1/metallama', async (req, res) => {
    const { message } = req.body; 
    try {
        const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.LLAMA_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are CHAT-GPT. Text generation model. And give short, precise, concise easy answers to users."
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ]
            })
        });

        const generatedResponse = await result.json(); 
        return res.status(200).json({
            status: true,
            result: generatedResponse.choices[0].message.content 
        }); 
    } catch (err) {
        console.error('We are having some issues, please wait:', err); 
        return res.status(500).json({
            status: false,
            result: 'We are having some issues, please wait.'
        });
    }
});

export default app;
