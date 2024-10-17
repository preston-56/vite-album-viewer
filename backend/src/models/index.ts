import User from './User';
import Album from './Album';
import Photo from './Photo';

const initModels = () => {
  User.hasMany(Album, { foreignKey: 'userId' });
  Album.belongsTo(User, { foreignKey: 'userId' });

  Album.hasMany(Photo, { foreignKey: 'albumId' });
  Photo.belongsTo(Album, { foreignKey: 'albumId' });
};

export { User, Album, Photo, initModels };
