'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vorpal = _interopDefault(require('vorpal'));
var Sequelize = _interopDefault(require('sequelize'));
var Fuse = _interopDefault(require('fuse.js'));
var fetch = _interopDefault(require('isomorphic-fetch'));

const createConnection = () => {
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

const updateUserPackage = (pkgId = 80, userId) =>
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

var findUserId = name =>
  getAllCompanyUsers().then(makeSearchObject).then(fuse => fuse.search(name));

var featureCacheReset = idUser =>
  fetch(
    `https://apidev.cbinsights.com/api/v1/user/features?idUser=${idUser}&noCache=true`
  ).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });

const vorpal = Vorpal();

vorpal
  .command('id <name>', 'Find user id by name (fuzzy)')
  .action(function({ name }, callback) {
    const self = this;
    findUserId(name).then(([bestMatch, ...otherResults]) => {
      self.log(`Ids for ${name}, best match is ${bestMatch}`);
      callback();
    });
  });

vorpal
  .command('chpkg <idPackage> [idUser]', 'Change package')
  .action(function({ idUser, idPackage }, callback) {
    updateUserPackage(idPackage, idUser);
    featureCacheReset(idUser);
    this.log(`Updated user ${idUser} to ${idPackage}`);
    callback();
  });

vorpal.delimiter('CBI$$').show();
