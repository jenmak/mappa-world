// purgecss --css build/static/css/*.css --content src/**/*.js --out build/static/css
module.exports = {
  content: ['index.html'],
  css: ['build/static/css/*.css'],
  fontFace: true,
  keyframes: true
}