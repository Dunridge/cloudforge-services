import {Request, Response} from 'express';

export const checkWhetherEmailIsRFQ = async (req: Request, res: Response) => {
    // should receive only email body 

    return res.status(201).json({ message: 'Check for the email fired' });
}