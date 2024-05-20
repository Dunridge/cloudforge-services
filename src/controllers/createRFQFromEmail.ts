import {Request, Response} from 'express';
import { collections } from '../database/connectToDB';

export const createRFQFromEmail = async (req: Request, res: Response) => {
    // const requestBody = { email, subject, content }; // this is sent to the endpoint
    
    try {
        const email = req.body;
        // res.json({ message: 'endpoint reached', body: email });
    
        if (!collections.emails) {
            return res.status(500).json({ message: 'Database collection not initialized.' });
        }
    
        const result = await collections.emails.insertOne({ email });
        return res.status(201).json({ message: 'Email inserted successfully', result });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}