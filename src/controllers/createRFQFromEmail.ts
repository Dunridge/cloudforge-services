import * as dotenv from "dotenv";
import { Request, Response } from 'express';
import OpenAI from "openai";
import { collections } from '../database/connectToDB';

dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const createRFQFromEmail = async (req: Request, res: Response) => {
    // const requestBody = { emailAdress, subject, content, isRFQable }; // this is sent to the endpoint
    
    try {
        const { emailAdress, subject, content } = req.body;
        // res.json({ message: 'endpoint reached', body: email });
    
        const systemPrompt = `
        You are an AI tasked with creating a Requests for Quotation (RFQs). This email exhibits 
        characteristics typical of an RFQ: ${content}
        Extract the customer, products and quantities being requested, 
        along with any other relevant information like custom dimensions or processing, due 
        dates, shipping restrictions, etc.

        Example of a structured quote: 
        Customer: John Doe
        Email: john.doe@example.com

        Requested Products:

        Product A: 100 units
        Product B: 50 units (custom dimensions required)
        Due Date: 2024-06-01
        Shipping Address: 123 Main Street, Anytown, USA

        Quote:
        Product A: 100 units x $10/unit = $1000
        Product B: 50 units x $15/unit = $750 (custom dimensions)

        Total Cost: $1750
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

        const emailText = response.choices[0].message?.content!.trim();


        if (!collections.emails) {
            return res.status(500).json({ message: 'Database collection not initialized.' });
        }
    
        const result = await collections.rfqs!.insertOne({ emailAdress, subject, emailText });
        return res.status(201).json({ message: 'Email inserted successfully', result, emailText });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}