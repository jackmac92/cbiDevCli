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
