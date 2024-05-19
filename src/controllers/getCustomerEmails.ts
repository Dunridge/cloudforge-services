import {Request, Response} from 'express';
import { collections } from '../database/connectToDB';

export const getCustomerEmails = (req: Request, res: Response) => {
    // res.json({ message: 'data2' }); // http://localhost:3000/api/data
    if (collections.emails) { 
        const dataRes = collections.emails.find({}).toArray();
        dataRes.then((data) => {
            console.log('data: ', data);
            res.json(data);
        });
    }
}