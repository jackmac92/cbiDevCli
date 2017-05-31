import Sequelize from 'sequelize';

export const createConnection = (db = 'cbi_user') => {
  const sequelize = new Sequelize(db, 'jmccown', 'esEbdDtsY8', {
    host: 'mysql-dev.cbinsights.com',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  return sequelize.authenticate().then(() => sequelize).catch(err => {
    console.log(err);
    throw new Error('Unable to authenticate with DB');
  });
};
