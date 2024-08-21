import Trainee from "../model/trainee.js";
import {generatePassword} from "../utils/generatePassword.js";
import {authenticate} from '../middleware/auth.js'

export const registerTrainee = async (req, res) => {
    try {
        const { photo, fullName, dateOfBirth, gender, emailAddress, phoneNumber, address, educationLevel, coursesInterested } = req.body;

        const password =await generatePassword();

        const newTrainee = new Trainee({
            photo,
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