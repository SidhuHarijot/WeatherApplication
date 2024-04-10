module.exports = {
  content: ['App.js', 'android/**/*.js', 'ios/**/*.js', 'tailwind.json'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
