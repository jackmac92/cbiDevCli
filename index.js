import Vorpal from 'vorpal';
import updateUserPackage from './db/updateUserPkg';
import findUserId from './db/findIdByName';
import featureCacheReset from './api/resetFeatureCache';

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

vorpal
  .command('buildLocal [env]', 'Change package')
  .action(function({ env }, callback) {
    this.log(`Building for ${env}`);
    callback();
  });

vorpal.delimiter('CBI$$').show();
