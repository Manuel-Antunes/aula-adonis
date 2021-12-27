module.exports = {
  purge: [
    './resources/views/**/*.edge',
    './resources/css/**/*.css',
    './resources/js/**/*.js',
    './resources/js/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      blur: {
        sm: '2px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
