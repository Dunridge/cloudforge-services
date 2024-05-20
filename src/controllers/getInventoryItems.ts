import { collections } from "../database/connectToDB";
import {Request, Response} from 'express';

export const getInvetoryItems = (req: Request, res: Response) => {
    if (collections.emails) { 
        const dataRes = collections.inventory!.find({}).toArray();
        dataRes.then((data) => {
            console.log('data: ', data);
            res.json(data);
        });
    }
}

