/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                indo: ["IndoPak"],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["garden"],
    },
};
