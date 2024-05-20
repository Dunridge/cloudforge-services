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
        const email = req.body.content;

        // TODO: look at the example of this prompt structure

        const systemPrompt = `
        You are an AI tasked with analyzing email content to identify Requests for Quotation (RFQs). 
        Your goal is to determine whether the provided email exhibits characteristics typical of an RFQ.
        Consider factors such as language, context, and formatting to make an informed decision. 
        Your response should indicate whether the email is likely an RFQ or not.
        Determine if the following email content is a Request for Quotation (RFQ): ${email}
        Your response should only contain "Yes" or "No" as the answer.
        `;

        // const userPrompt = `Determine if the following email content is a Request for Quotation (RFQ): ${email}`;

        const messages: any[] = [
            { role: "system", content: systemPrompt },
            // { role: "user", content: userPrompt },
        ];
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 60,
        });

        const aiText = response.choices[0].message?.content!.trim();
        const isRFQ = aiText?.toLowerCase().includes("yes") ?? false;

        // return res.status(201).json({ message: aiText, email, isRFQ });
        return res.status(201).json({ aiText, isRFQ });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
};
