import { Request, Response } from "express";
import OpenAI from "openai";
import * as dotenv from "dotenv";
import { collections } from "../database/connectToDB";

dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const checkWhetherRFQCanBeFilled = async (req: Request, res: Response) => {

    try {
        const rfqText = req.body.emailText;
        const inventory = await collections.inventory?.find({}).toArray();

        if (!inventory) {
            return res.status(500).json({ message: "Failed to retrieve inventory" });
        }

        const inventoryText = inventory.map(item => `${item.name}: ${item.quantity}: price: ${ item.price }`).join(", ");

        // TODO: look at the example of this prompt structure

        // TODO: modify the propmpt to include the price for the rfq
        // TODO: later on come up with a text for the prices of the items
        const systemPrompt = `
        You are an AI tasked with analyzing email content to identify Requests for Quotation (RFQs) 
        and determining if they can be filled with the current inventory.
        The current inventory is as follows: ${inventoryText}.
        Your goal is to determine whether the provided email exhibits characteristics typical of an RFQ
        and whether the requested items in the email can be fulfilled with the given inventory.
        Your response should indicate "Yes" if the email is an RFQ and can be filled with the current inventory, 
        "No" if it is an RFQ but cannot be filled.
        
        Determine if the following RFQ can be fulfilled with the current inventory:
        ${rfqText}

        Your response should be "Yes", "No"

        Also specify the sales price of the whole product. Calculate it by going over the inventory and summing up the cost.
        
        Write out only the price for the whole product 
        
        Example fromat of the answer: 
        "Yes. Price: 1200"
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
        const canBeFilled = aiText?.toLowerCase().includes("yes") ?? false;
        const responseTextArr = aiText.split('Price: ');
        const price = responseTextArr[1];

        return res.status(201).json({ aiText, canBeFilled, price });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error });
    }
};