import { getPost } from '$lib/getContent';
import type { RequestHandler } from '@sveltejs/kit';

const get: RequestHandler = async ({ params }) => {
	const { slug } = params;

	try {
		const post = await getPost(slug);
		return {
			body: {
				post
			},
			headers: {
				'Cache-Control': `max-age=0, s-max-age=${60}`
			}
		};
	} catch (err) {
		return {
			status: 404,
			body: err.message
		};
	}
};

export { get };
