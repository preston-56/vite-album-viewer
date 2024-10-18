import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/config';

class Photo extends Model {}

Photo.init({
  albumId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Photo',
});

export default Photo;