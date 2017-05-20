import Vorpal from 'vorpal';
import { updateUserPackage } from './db/index';

const vorpal = Vorpal();

vorpal
  .command('chpkg <package> [idUser]', 'Change package')
  .action(function(args, callback) {
    updateUserPackage(args.package, args.idUser);
    this.log(`Updated user ${args.idUser} to ${args.package}`);
    callback();
  });

vorpal.delimiter('CBI$$').show();
