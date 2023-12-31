/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}',
 "./node_modules/flowbite/**/*.js"],
 theme: {
   extend: {
    colors: {
      coloresPer: {
        texto: '#fdf8db',
        icon: '#7D7143'
    },

    },
   },
 },
 plugins: [
  require('flowbite/plugin')
 ],
};
