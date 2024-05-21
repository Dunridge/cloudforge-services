import {Request, Response} from 'express';
import { collections } from '../database/connectToDB';

export const getCreatedRFQs = (req: Request, res: Response) => { 
    if (collections.rfqs) { 
        const dataRes = collections.rfqs.find().toArray();

        dataRes.then((data) => {
            console.log('data: ', data);
            res.json(data);
        });
    }
}