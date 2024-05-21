
import {Request, Response} from 'express';
import { collections } from '../database/connectToDB';

export const sendRFQ = async (req: Request, res: Response) => {
    // emailAdress, emailText, subject

    try {
        const { emailAdress, emailText, subject } = req.body;

        if (!collections.sent_rfqs) {
            return res.status(500).json({ message: 'Database collection not initialized.' });
        }
        const result = await collections.sent_rfqs.insertOne({ emailAdress, emailText, subject });
        return res.status(201).json({ message: 'Email sent successfully', result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}