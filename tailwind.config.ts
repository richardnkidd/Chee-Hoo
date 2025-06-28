/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Tropical color palette
        tropical: {
          'deep-green': 'rgb(var(--tropical-deep-green) / <alpha-value>)',
          'sage': 'rgb(var(--tropical-sage) / <alpha-value>)',
          'ocean-deep': 'rgb(var(--tropical-ocean-deep) / <alpha-value>)',
          'ocean': 'rgb(var(--tropical-ocean) / <alpha-value>)',
          'ocean-light': 'rgb(var(--tropical-ocean-light) / <alpha-value>)',
          'sand': 'rgb(var(--tropical-sand) / <alpha-value>)',
          'volcanic': 'rgb(var(--tropical-volcanic) / <alpha-value>)',
          'stone': 'rgb(var(--tropical-stone) / <alpha-value>)',
          'mist': 'rgb(var(--tropical-mist) / <alpha-value>)',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Organic shapes
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      fontSize: {
        'caption': ['0.625rem', { lineHeight: '1.4', fontWeight: '400' }], // 10px
        'small': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],    // 12px
        'h3': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],      // 14px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],        // 16px
        'h2': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],       // 20px
        'h1': ['1.5rem', { lineHeight: '1.2', fontWeight: '700' }],        // 24px
      },
      fontWeight: {
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Tropical animations
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-5px) translateY(-5px)' },
          '75%': { transform: 'translateX(5px) translateY(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-pattern': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Tropical animations
        'wave': 'wave 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-pattern': 'float-pattern 120s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Tropical patterns
        'wave-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23214263' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'tropical': '0 8px 32px rgba(25, 30, 25, 0.3)',
        'tropical-lg': '0 12px 40px rgba(25, 30, 25, 0.4)',
        'inner-light': 'inset 0 1px 0 rgba(234, 221, 202, 0.1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}