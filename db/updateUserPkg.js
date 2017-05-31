import { createConnection } from './index';

export default (pkgId = 80, userId) =>
  createConnection().then(sequelize => {
    sequelize.query(
      `
      UPDATE cbi_user
      SET id_package=${pkgId}
      WHERE id_user=${userId}
    `,
      { type: sequelize.QueryTypes.UPDATE }
    );
  });
