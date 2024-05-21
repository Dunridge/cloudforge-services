import { Router } from "express";
import { getCustomerEmails } from "../controllers/getCustomerEmails";
import { postEmail } from "../controllers/postEmail";
import { checkWhetherEmailIsRFQ } from "../controllers/checkWhetherEmailIsRFQ";
import { createRFQFromEmail } from "../controllers/createRFQFromEmail";
import { getInvetoryItems } from "../controllers/getInventoryItems";
import { getCreatedRFQs } from "../controllers/getCreatedRFQs";
import { getSentRFQs } from "../controllers/getSentRFQs";
import { sendRFQ } from "../controllers/sendRFQ";
import { checkWhetherRFQCanBeFilled } from "../controllers/checkWhetherRFQCanBeFilled";

// Use Postman to test this 
const router = Router();

// GET
router.get('/getInvetoryItems', getInvetoryItems);
router.get('/getCustomerEmails', getCustomerEmails);
router.get('/getCreatedRFQs', getCreatedRFQs);
router.get('/getSentRFQ', getSentRFQs);

// POST
router.post('/postEmail', postEmail);
router.post('/checkWhetherEmailIsRFQ', checkWhetherEmailIsRFQ);
router.post('/createRFQFromEmail', createRFQFromEmail);
router.post('/sendRFQ', sendRFQ);

router.post('/checkWhetherRFQCanBeFilled', checkWhetherRFQCanBeFilled);

// check whether order can be filled (this is the call from draft quotes page)
// // this can be done on the FE side 

// add an endpoint to add items to the inventory (for testing purposes)

export default router;