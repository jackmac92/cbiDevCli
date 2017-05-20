import mysql from 'mysql';

const createConnection = () => {
  const connection = mysql.createConnection({
    user: 'jmccown',
    password: 'esEbdDtsY8',
    host: 'mysql-dev.cbinsights.com',
    database: 'cbi_user'
  });
  connection.connect();
  return connection;
};

export const updateUserPackage = (pkgId = 80, userId) => {
  const connection = createConnection();
  connection.query(
    `
      UPDATE cbi_user
      SET id_package=${pkgId}
      WHERE id_user=${userId}
    `,
    (error, results, fields) => {
      if (error) throw error;
      console.log('The solution is: ', results[0]);
    }
  );
  connection.end();
};

export const findCompanyUser = () => {
  const connection = createConnection();
  connection.query(
    `
      SELECT id_user, lname, fname
      FROM cbi_user
      WHERE id_package=80 AND
      fname != 'Test' AND fname != 'test'
    `,
    (error, results, fields) => {
      if (error) throw error;
      console.log('The solution is: ', results[0]);
    }
  );
  connection.end();
};
