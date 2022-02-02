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
            ...data.post,
            createdAt: new Date(data.post.createdAt),
            publishedAt: new Date(data.post.publishedAt),
            updatedAt: new Date(data.post.updatedAt),
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
  import Meta from 'svelte-meta';
  import { GITHUB_REPO, GITHUB_USER, SITE_TITLE, SITE_URL, SITE_DESCRIPTION, DEFAULT_IMAGE } from '$lib/siteConfig';
  
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  
  import User from '$lib/components/User.svelte';
  
  let GiscusComponent;
  onMount(async () => {
    const { Giscus } = await import('@giscus/svelte');
    GiscusComponent = Giscus;
  });

  export let number;
  export let publishedAt;

  export let title;
  export let content;
  export let author;
  export let readingTime;
  export let url;
  export let category;
</script>

<Meta
  title="{SITE_TITLE} - {title}"
  description={SITE_DESCRIPTION}
  image={DEFAULT_IMAGE}
  url={SITE_URL}/>

<a href={url} target="_blank" class="hover:underline leading-none text-gray-400 uppercase tracking-wide text-sm font-extrabold">
  {publishedAt.toLocaleDateString('en-GB', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}
</a>
<h1 class="text-4xl font-extrabold">
  {title}
  {#if category.toLowerCase().includes("draft")}
    <span class="ml-2 inline-block align-middle text-xs uppercase font-mono font-bold border-2 px-1 rounded-md text-yellow-500">Draft</span>
  {/if}
</h1>

<div class="flex justify-between items-center mt-4 mb-8">
  <User {...author}></User>
  <div class="flex items-center flex-row">
    <span class="i-teenyicons-book-outline"></span>
    <span class="ml-2 font-mono text-xs">
      {readingTime <= 1 ? "Less than a minute" : `${readingTime} minutes`}
    </span>
  </div>
</div>
  
<hr class="my-4 border-t-2 border-gray-200">

<article class="text-base prose dark:prose-invert">
  {@html content}
</article>

<hr class="my-4 border-t-2 border-gray-200">

<div class="mt-4">
  <span id="reactions" />
  {#if browser}  
    <svelte:component this={GiscusComponent}
      repo="{GITHUB_USER}/{GITHUB_REPO}"
      mapping="number"
      term={number}
      reactionsEnabled=1
      emitMetadata=0
      theme="http://localhost:3000/comments.css"
    />
  {/if}
  <span id="comments" />
</div>

<style global>
  .giscus-frame {
    outline: none
  }
</style>