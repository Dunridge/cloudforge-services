import { Router } from "express";
import { getCustomerEmails } from "../controllers/getCustomerEmails";
import { createRFQFromEmail } from "../controllers/createRFQFromEmail";

// Use Postman to test this 
const router = Router();

router.get('/getCustomerEmails', getCustomerEmails);
// Tip: after each modification restart the server to update it 
// TODO: add an endpoint to check whether an email is an RFQ using AI (if it is you can update a field isRFQ to true) 

router.post('/createRFQFromEmail', createRFQFromEmail);

export default router;