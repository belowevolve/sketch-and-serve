import { addIconSelectors } from '@iconify/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	plugins: [
		addIconSelectors({
			prefixes: ['lucide', 'ph'],
		}),
	],
}
