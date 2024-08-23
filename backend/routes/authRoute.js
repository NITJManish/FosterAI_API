import express from 'express';
import multer from 'multer'
const router=express.Router();
import { adminSideData, getAdminsideData, getTraineeById, getTraineeData, login, registerTrainee } from '../controllers/traineeController.js'


// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  // Routes
  router.post('/interns', upload.single('photo'), adminSideData);

router.post('/register',registerTrainee );
router.post('/login', login);
router.get('/trainee', getTraineeData);
router.get('/trainee/:id', getTraineeById);
router.post('/admin', upload.single('photo'), adminSideData);
router.get('/admin', getAdminsideData);




export default router;