const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  style: {
    postcss: {
      plugins: [
        purgecss({
          content: ['./build/**/*.html', './build/**/*.js'],
        }),
      ],
    },
  },
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }]
};
