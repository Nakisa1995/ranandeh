/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { 
    extend: {
      colors: { brand: { DEFAULT:'#00AE4D', dark:'#00682C', light:'#8CCB32' } },
      boxShadow: { card: '0 2px 12px rgba(0,0,0,0.08)' },
      borderRadius: { xl: '14px' }
    } 
  },
  plugins: []
};
