import { Router } from "express";
import { getCustomerEmails } from "../controllers/getCustomerEmails";

const router = Router();

router.get('/getCustomerEmails', getCustomerEmails);

export default router;