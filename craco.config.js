const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  style: {
    postcss: {
      plugins: [
        purgecss({
          content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
        }),
      ],
    },
  }
};
