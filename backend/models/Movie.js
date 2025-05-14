import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Movie = sequelize.define('Movie', {
  title:    { type: DataTypes.STRING, allowNull: false },
  image:    { type: DataTypes.STRING, allowNull: false },
  synopsis: { type: DataTypes.TEXT, allowNull: false },
  year:     { type: DataTypes.INTEGER, allowNull: false }
});

export default Movie;