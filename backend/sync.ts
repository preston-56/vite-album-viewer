import {sequelize} from './src/config/config'; 
import User from './src/models/User';
import Album from './src/models/Album';
import Photo from './src/models/Photo';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();
