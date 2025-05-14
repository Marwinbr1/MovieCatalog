import Movie from '../models/Movie.js';

export const getAllMovies = async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
};

export const getMovieById = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Not found' });
  res.json(movie);
};

export const createMovie = async (req, res) => {
  const { title, image, synopsis, year } = req.body;
  if (!title || !image || !synopsis || !year) return res.status(400).json({ error: 'Missing fields' });
  const movie = await Movie.create({ title, image, synopsis, year });
  res.status(201).json(movie);
};

export const updateMovie = async (req, res) => {
  const { title, image, synopsis, year } = req.body;
  const movie = await Movie.findByPk(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Not found' });
  await movie.update({ title, image, synopsis, year });
  res.json(movie);
};

export const deleteMovie = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Not found' });
  await movie.destroy();
  res.status(204).end();
};