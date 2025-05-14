import express from 'express';
import cors from 'cors';
import sequelize from './models/index.js';
import Movie from './models/Movie.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/movies', movieRoutes);

const PORT = 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
});