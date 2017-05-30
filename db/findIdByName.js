import { createConnection } from './index';
import Fuse from 'fuse.js';

const getAllCompanyUsers = () =>
  createConnection().then(sequelize =>
    sequelize.query(
      `
      SELECT id_user, lname, fname
      FROM cbi_user
      WHERE id_package=80 AND
      fname != 'Test' AND fname != 'test'
   `,
      { type: sequelize.QueryTypes.SELECT }
    )
  );
const makeSearchObject = users =>
  new Fuse(users, { id: 'id_user', keys: ['fname', 'lname'] });

export default name =>
  getAllCompanyUsers().then(makeSearchObject).then(fuse => fuse.search(name));
