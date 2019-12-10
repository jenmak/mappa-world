module.exports = {
  content: ['build/static/js/*.js'],
  css: ['build/static/css/*.css'],
  fontFace: true,
  keyframes: true,
  rejected: true,
  extractors: [{
      extractor: class {
          static extract(content) {
          return content.match(/[A-z0-9-:\/]+/g) || []
          }
      },
      extensions: ['js']
  }]
};