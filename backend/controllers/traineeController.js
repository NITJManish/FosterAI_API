import Trainee from "../model/trainee.js";
import Intern from "../model/admin.js";
import {generatePassword} from "../utils/generatePassword.js";
import {authenticate} from '../middleware/auth.js'


export const registerTrainee = async (req, res) => {
    try {
        const { fullName, dateOfBirth, gender, emailAddress, phoneNumber, address, educationLevel, coursesInterested } = req.body;

        const password =await generatePassword();

        const newTrainee = new Trainee({
            fullName,
            dateOfBirth,
            gender,
            emailAddress,
            phoneNumber,
            address,
            educationLevel,
            coursesInterested,
            password
        });

        await newTrainee.save();
        res.status(201).json({ message: 'Trainee registered successfully', trainee: newTrainee });
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: 'Error registering trainee', error });
    }
};


export const login = async (req, res) => {
  try {
      const { identifier, password } = req.body;

      const trainee = await authenticate(identifier, password);

      if (!trainee) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', trainee });
  } catch (error) {
      res.status(500).json({ message: 'Error during login', error });
  }
};

//get all trainee 
export const getTraineeData = async (req, res) => {
    try {
       
        const trainee = await Trainee.find();
  
        if (!trainee) {
            return res.status(401).json({ message: 'No trainee found' });
        }
  
        res.status(200).json({ trainee });
    } catch (error) {
        res.status(500).json({ message: 'Error during fetching data', error });
    }
  };
//get single trainee by id
  export const getTraineeById = async (req, res) => {
    try {
       
        const trainee = await Trainee.findById(req.params.id);
  
        if (!trainee) {
            return res.status(401).json({ message: 'No trainee found by this Id' });
        }
  
        res.status(200).json({ trainee });
    } catch (error) {
        res.status(500).json({ message: 'Error during fetching data', error });
    }
  };


  //data from admin side
  export const adminSideData = async (req, res) => {
    try {
        const { CertificateNumber, StartDate, EndDate, FatherName, InternsTechnology } = req.body;
        const photo = req.file ? req.file.path : null;
    
        const newIntern = new Intern({
          photo,
          CertificateNumber,
          StartDate,
          EndDate,
          FatherName,
          InternsTechnology
        });
    
        await newIntern.save();
        res.status(201).json({ message: 'Intern record created successfully', data: newIntern });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    };


    //get all intern data 
export const getAdminsideData = async (req, res) => {
    try {
        const interns = await Intern.find();
        res.status(200).json({ data: interns });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    };