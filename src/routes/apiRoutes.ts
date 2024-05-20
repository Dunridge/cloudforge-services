import { Router } from "express";
import { getCustomerEmails } from "../controllers/getCustomerEmails";
import { postEmail } from "../controllers/postEmail";
import { checkWhetherEmailIsRFQ } from "../controllers/checkWhetherEmailIsRFQ";

const router = Router();

router.get('/getCustomerEmails', getCustomerEmails);
router.post('/postEmail', postEmail);
router.post('/checkWhetherEmailIsRFQ', checkWhetherEmailIsRFQ);

// router.post('/createRFQFromEmail', createRFQFromEmail);

export default router;