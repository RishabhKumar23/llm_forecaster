// tailwind.config.js
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(6px)' },
                },
            },
            animation: {
                'float-slow': 'float-slow 10s ease-in-out infinite',
                'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
