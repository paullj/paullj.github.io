<script context="module">
	export const prerender = true;
	export const hydrate = true;

	export const load = async({ params, fetch }) => {
    const slug = params.slug;
		try {
			const res = await fetch(`/posts/${slug}.json`);
			if (res.status === 200) {
        const post = await res.json();
        return {
          props: {
            ...post,
            createdAt: new Date(post.createdAt),
            publishedAt: new Date(post.publishedAt),
            lastEditedAt: new Date(post.lastEditedAt),
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

<script lang="ts">
  import { GITHUB_REPO, GITHUB_USER, SITE_TITLE, SITE_URL, SITE_DESCRIPTION, DEFAULT_IMAGE, GITHUB_REPO_ID } from '$lib/siteConfig';
  
  import Meta from 'svelte-meta';
  import User from '$lib/components/User.svelte';
  import Comments from '$lib/components/Comments.svelte';
  import ShareIcons from '$lib/components/ShareIcons.svelte';

  export let number;
  export let publishedAt;
  export let lastEditedAt;

  export let title;
  export let content;
  export let description;
  export let author;
  export let readingTime;
  export let url;
  export let category;
</script>

<Meta
  title="{title} - {SITE_TITLE}"
  description={description ?? SITE_DESCRIPTION}
  image={DEFAULT_IMAGE}
  url={SITE_URL}/>

<a href={url} target="_blank" class="hover:underline leading-none dark:text-gray-400 text-gray-500 uppercase tracking-wide text-sm font-extrabold">
  {publishedAt.toLocaleDateString('en-GB', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}
</a>
<h1 class="text-4xl font-extrabold">
  {title}
  {#if category.toLowerCase().includes("draft")}
    <span class="ml-2 inline-block align-middle text-xs uppercase font-mono font-bold border-2 px-1 rounded-md text-yellow-500">Draft</span>
  {/if}
</h1>
{#if !description.endsWith("...")}
<p class="mt-2 font-extralight text-lg">
  {description}
</p>
{/if}
<div class="flex justify-between items-center mt-4 mb-2">
  <User {...author}></User>
  {#if lastEditedAt !== publishedAt}
    <span class="flex-1 mx-2 text-gray-500 dark:text-gray-400 text-xs align-middle inline-block">
      (Last edited {lastEditedAt.toLocaleDateString('en-GB', { hour: "numeric", minute: "numeric", year: '2-digit', month: 'short', day: 'numeric' })})
    </span>
  {/if}
  <div class="align-middle text-right">
    <span class="i-teenyicons-stopwatch-outline"></span>
    <span class="ml-2 font-mono text-xs">
      {readingTime <= 1 ? "Less than a minute" : `${readingTime} minute`} read
    </span>
  </div>
</div>
  
<ShareIcons {title} {description}/>

<hr class="mb-6 mt-8 border-t-2 border-gray-200">

<article class="text-base prose dark:prose-invert">
  {@html content}
</article>

<hr class="my-4 border-t-2 border-gray-200">

<div class="mt-4">
  <span id="reactions" />
  <Comments user={GITHUB_USER} repo={GITHUB_REPO} repoId={GITHUB_REPO_ID} {number}></Comments>
</div>