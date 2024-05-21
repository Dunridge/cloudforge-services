import {Request, Response} from 'express';
import { collections } from '../database/connectToDB';

export const getSentRFQs = (req: Request, res: Response) => { 
    if (collections.sent_rfqs) { 
        const dataRes = collections.sent_rfqs.find().toArray();
        dataRes.then((data) => {
            console.log('data: ', data);
            res.json(data);
        });
    }
}    
