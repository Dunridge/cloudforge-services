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
        // TODO: look at the example of this propmpt structure by John
        const prompt = `Determine if the following email content is a Request for Quotation (RFQ): "${email}"`;
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 60,
        });

        const aiText = response.choices[0].text.trim();
        const isRFQ = aiText.toLowerCase().includes("yes");

        return res
            .status(201)
            .json({ message: "Check for the email fired", email, isRFQ });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};
