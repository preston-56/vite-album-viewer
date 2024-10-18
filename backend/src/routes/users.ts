import express, {Request, Response} from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.post('/', (req, res) => {
  const { name, username, email } = req.body;
  const newUser = { id: Date.now(), name, username, email }; 
  res.status(201).json(newUser);
});

export default router;
