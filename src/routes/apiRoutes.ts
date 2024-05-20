import { Router } from "express";
import { getCustomerEmails } from "../controllers/getCustomerEmails";
import { postEmail } from "../controllers/postEmail";
import { checkWhetherEmailIsRFQ } from "../controllers/checkWhetherEmailIsRFQ";
import { createRFQFromEmail } from "../controllers/createRFQFromEmail";
import { getInvetoryItems } from "../controllers/getInventoryItems";

// Use Postman to test this 
const router = Router();

router.get('/getCustomerEmails', getCustomerEmails);
router.post('/postEmail', postEmail);
router.post('/checkWhetherEmailIsRFQ', checkWhetherEmailIsRFQ);
router.post('/createRFQFromEmail', createRFQFromEmail);

// get inventory items 
router.get('/getInvetoryItems', getInvetoryItems);

// check whether order can be filled (this is the call from draft quotes page)
// // this can be done on the FE side 

// add an endpoint to add items to the inventory (for testing purposes)

export default router;