export default {
  dest: 'bundle.js',
  format: 'cjs',
  entry: 'index.js',
  external: ['vorpal', 'sequelize', 'fuse.js', 'isomorphic-fetch']
};
