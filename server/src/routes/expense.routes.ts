import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expense.controller";

const router = Router();


router.route('/').get(getExpensesByCategory);


export default router;