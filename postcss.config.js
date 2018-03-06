const env = process.env.NODE_ENV;
const plugins = [];

if (env === 'production') {
  plugins.push(require('autoprefixer'));
}
module.exports = {
  plugins,
};

