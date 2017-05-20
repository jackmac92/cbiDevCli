'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vorpal = _interopDefault(require('vorpal'));
var mysql = _interopDefault(require('mysql'));

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

const updateUserPackage = (pkgId = 80, userId) => {
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

const vorpal = Vorpal();

vorpal
  .command('chpkg <package> [idUser]', 'Change package')
  .action(function(args, callback) {
    updateUserPackage(args.package, args.idUser);
    this.log(`Updated user ${args.idUser} to ${args.package}`);
    callback();
  });

vorpal.delimiter('CBI$$').show();
