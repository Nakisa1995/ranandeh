/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* توکن‌هایی که در globals.css استفاده کردیم */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        /* پالت برند خودت که قبلاً داشتی */
        brand: {
          50:'#eef7ff',100:'#d9edff',200:'#b9dcff',300:'#8fc7ff',400:'#60adff',
          500:'#1f92ff',600:'#1672ea',700:'#165cc1',800:'#184f9b',900:'#183f77',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      boxShadow: { soft: '0 10px 30px rgba(0,0,0,.08)' },

      backgroundImage: {
        dots: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,.08) 1px, transparent 1px)',
      },

      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        aurora: {
          '0%': { transform: 'translate3d(-10%,-10%,0) scale(1)' },
          '50%': { transform: 'translate3d(10%,10%,0) scale(1.05)' },
          '100%': { transform: 'translate3d(-10%,-10%,0) scale(1)' },
        },
        fadeInUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        aurora: 'aurora 12s ease-in-out infinite',
        fadeInUp: 'fadeInUp .6s ease forwards',
      },
    },
  },
  plugins: [],
};
