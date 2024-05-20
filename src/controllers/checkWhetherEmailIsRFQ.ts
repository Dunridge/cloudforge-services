import { Request, Response } from "express";
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// TODO: in the future optimize the endpoint and ask the user to just sent the id of the email
export const checkWhetherEmailIsRFQ = async (req: Request, res: Response) => {
    try {
        const email = req.body;
        
        // TODO: look at the example of this prompt structure by John
        const messages: any[] = [
            { role: "system", content: "You are an AI that determines if an email content is a Request for Quotation (RFQ)." },
            { role: "user", content: `Determine if the following email content is a Request for Quotation (RFQ): "${email}"` },
        ];
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 60,
        });

        const aiText = response.choices[0].message?.content!.trim();
        const isRFQ = aiText?.toLowerCase().includes("yes") ?? false;

        return res
            .status(201)
            .json({ message: aiText, email, isRFQ });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};
