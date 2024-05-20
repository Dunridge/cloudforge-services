import {Request, Response} from 'express';

export const createRFQFromEmail = (req: Request, res: Response) => {
    const body = req.body;
    res.json({ message: 'endpoint reached', body: body });
}