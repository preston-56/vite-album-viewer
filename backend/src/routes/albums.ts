import express, {Request, Response} from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums' });
  }
});

router.post('/', (req, res) => {
  const { userId, title } = req.body;
  const newAlbum = { id: Date.now(), userId, title }; 
  res.status(201).json(newAlbum);
});

export default router;
