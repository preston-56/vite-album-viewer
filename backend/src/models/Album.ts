import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Album extends Model {}

Album.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Album',
});

export default Album;
