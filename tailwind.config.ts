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
        // Tropical color palette - Direct hex values
        tropical: {
          'deep-green': '#191E19',
          'sage': '#435443',
          'ocean-deep': '#0F2B3E',
          'ocean': '#214263',
          'ocean-light': '#407B9E',
          'sand': '#EADDCA',
          'volcanic': '#8B2323',
          'stone': '#2D2D2B',
          'mist': '#F5F3F0',
        },
        border: "#435443",
        input: "#435443",
        ring: "#407B9E",
        background: "#191E19",
        foreground: "#F5F3F0",
        primary: {
          DEFAULT: "#407B9E",
          foreground: "#F5F3F0",
        },
        secondary: {
          DEFAULT: "#435443",
          foreground: "#F5F3F0",
        },
        destructive: {
          DEFAULT: "#8B2323",
          foreground: "#F5F3F0",
        },
        muted: {
          DEFAULT: "#2D2D2B",
          foreground: "#EADDCA",
        },
        accent: {
          DEFAULT: "#214263",
          foreground: "#F5F3F0",
        },
        popover: {
          DEFAULT: "#2D2D2B",
          foreground: "#F5F3F0",
        },
        card: {
          DEFAULT: "#2D2D2B",
          foreground: "#F5F3F0",
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
        // Design Specification Animation System
        'fade-in': 'fadeIn 500ms ease-in-out',
        'slide-up': 'slideUp 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'wave': 'wave 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-pattern': 'float-pattern 120s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'ripple': 'ripple 600ms ease-out',
        'pulse-enhanced': 'pulse 2s ease-in-out infinite',
        'bounce-enhanced': 'bounce 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'standard': 'ease-in-out',
      },
      transitionDuration: {
        'micro': '200ms',
        'short': '300ms',
        'medium': '500ms',
        'long': '1000ms',
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