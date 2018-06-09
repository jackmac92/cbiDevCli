const jenkins = require('jenkins');
const argv = require('minimist')(process.argv.slice(2));

const Jenkins = jenkins({
  baseUrl: `https://${process.env.JENKINS_USERNAME}:${process.env.JENKINS_PASSWORD}@jenkins.cbinsights.com`,
  crumbIssuer: true,
  promisify: true
});

const log = Jenkins.build.logStream(argv.build, argv.id, 'text');
log.on('data', process.stdout.write);
log.on('error', err => {
  console.log('err occured');
  console.log('err occured');
  console.log(err);
  console.log('err occured');
  console.log('err occured');
});
log.on('end', () => {
  console.log('Done');
});
