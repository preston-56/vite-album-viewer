import express, {Request, Response} from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req:Request, res:Response) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos' });
  }
});

router.post('/', (req, res) => {
  const { albumId, title, url } = req.body;
  const newPhoto = { albumId, title, url };
  res.status(201).json(newPhoto);
});

export default router;
