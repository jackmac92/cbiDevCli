import Sequelize from 'sequelize';

export const createConnection = () => {
  const sequelize = new Sequelize('cbi_user', 'jmccown', 'esEbdDtsY8', {
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
