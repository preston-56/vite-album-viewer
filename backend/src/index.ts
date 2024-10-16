import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users';
import albumRoutes from './routes/albums';
import photoRoutes from './routes/photos';

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true 
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/photos', photoRoutes);

// Catch-all route
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
