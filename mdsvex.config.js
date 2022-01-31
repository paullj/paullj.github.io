import oembed from 'remark-oembed';

export default {
	extensions: ['.md', '.svx'],
	smartypants: true,
	remarkPlugins: [[oembed, { syncWidget: true }]]
};
