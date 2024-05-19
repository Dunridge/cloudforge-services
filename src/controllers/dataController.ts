import {Request, Response} from 'express';

export const getData = (req: Request, res: Response) => {
    res.json({ message: 'data2' }); // http://localhost:3000/api/data
}