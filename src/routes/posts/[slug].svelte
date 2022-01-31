<script context="module">
	export const prerender = true;
	export const hydrate = true;
  
	export const load = async({ params, fetch }) => {
		const slug = params.slug;
		try {
			const res = await fetch(`/posts/${slug}.json`);
			if (res.status === 200) {
        const data = await res.json();
        return {
          props: {
            ...data.post
          },
          maxage: 60
        };
      }

      return {
        status: res.status,
        error: await res.text()
      };
		} catch (err) {
			console.error('error fetching blog post at [slug].svelte: ' + slug, err);
			return {
				status: 500,
				error: new Error('error fetching blog post at [slug].svelte: ' + slug)
			};
		}
	}
</script>

<script>
  import Comments from "$lib/components/Comments.svelte";
  import Reactions from "$lib/components/Reactions.svelte";

  export let slug;
  export let issueNumber;
  export let publishedAt;
  export let createdAt;
  export let updatedAt;
  export let totalReactions;
  
  export let url;
  export let title;
  export let content;
  export let reactions;
  export let comments;
</script>

<h1>{title}</h1>
<article class="text-base prose dark:prose-invert">
  {@html content}
</article>

<div id="reactions">
  <Reactions {reactions} {totalReactions}></Reactions>
</div>
<div id="comments">
  <Comments {comments} issueUrl={url}></Comments>
</div>