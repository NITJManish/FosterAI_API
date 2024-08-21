import express from 'express';
const router=express.Router();
import { login, registerTrainee } from '../controllers/traineeController.js'


router.post('/register',registerTrainee );
router.post('/login', login);


export default router;