/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      primary: '#f9f5ff',
      secondary: '#3f5bf6',
      'secondary-100': '#3f5bf640',
      gray: '#272727',
      'gray-100': '#f2f4f7',
      'gray-200': '#eaecf0',
      'gray-300': '#d0d5dd',
      'gray-400': '#98a2b3',
      'gray-50': '#f9fafb',
      'gray-500': '#667085',
      'gray-600': '#475467',
      'gray-700': '#344054',
      'gray-800': '#1d2939',
      'gray-900': '#101828',
      black: '#000000',
      transparent: 'transparent',
    },
    lineHeight: {
      1.2: '1.2rem',
      1.25: '1.25rem',
      1.5: '1.5rem',
      1.75: '1.75rem',
      2: '2rem',
    },
    fontFamily: {
      primary: "'Work Sans', sans-serif",
      secondary: "'Inter', sans-serif",
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      md: '1.5rem',
    },
    fontWeight: {
      light: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    extend: {},
  },
  plugins: [],
};

/* 
md:flex md:w-full md:before:hidden md:bg-transparent md:gap-1 md:relative md:flex-row md:top-0 md:right-0 [&>*]:cursor-pointer  h-fit p-4 flex-col items-center justify-center gap-4  top-[4.5rem] right-[1rem] absolute hidden 
*/
