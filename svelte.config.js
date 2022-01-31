import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

import unocss from 'unocss/vite';
import { mdsvex } from 'mdsvex';

import unoConfig from './uno.config.js';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig), preprocess()],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [unocss(unoConfig)]
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
