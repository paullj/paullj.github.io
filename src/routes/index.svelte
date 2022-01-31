<script context="module">
	export const prerender = true;
	export const hydrate = true;

	export const load = async({ fetch }) => {
    const res = await fetch(`/posts.json`);
    if (res.status === 200) {
      const data = await res.json();

      return {
        props: {
          posts: data.posts.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt),
            publishedAt: new Date(post.publishedAt),
            updatedAt: new Date(post.updatedAt),
          }))
        },
        maxage: 60
      };
    }

    return {
      status: res.status,
      error: await res.text()
    };
	}
</script>


<script lang="ts">
  import Meta from 'svelte-meta';
  import { SITE_TITLE, SITE_URL, SITE_DESCRIPTION, DEFAULT_IMAGE } from '$lib/siteConfig';

  let orderBy = "publishedAt";
  export let posts = [];

  $: {
    switch (orderBy) {
      case "reactions":
        posts = posts.sort((a, b) => b.totalReactions - a.totalReactions)
        break;
      case "comments":
        posts = posts.sort((a, b) => b.totalComments - a.totalComments)
        break;
      case "publishedAt":
      default:
        posts = posts.sort((a, b) => b.publishedAt - a.publishedAt)
        break;
    }
  }
</script>

<Meta
  title={SITE_TITLE}
  description={SITE_DESCRIPTION}
  image={DEFAULT_IMAGE}
  url={SITE_URL}/>

<!-- <h1>{ SITE_TITLE }</h1> -->

<form class="text-xl" on:submit|preventDefault>
  <div class="relative inline-block mr-2">
    <select bind:value={orderBy} name="posts-filter" id="posts-filter" class="bg-blue decoration-dotted decoration-2px hover:decoration-solid underline appearance-none bg-transparent">
      <option value="publishedAt" class="bg-white pr-2" selected>Recent</option>
      <option value="reactions" class="bg-white pr-4">Loved</option>
      <option value="comments" class="bg-white pr-4">Popular</option>
    </select> 
    <span class="inline-block absolute bottom-0 right-0 i-teenyicons-down-solid w-2 h-full pointer-events-none">
    </span>
  </div>   
  <label for="posts-filter">Posts</label>
</form>

<ul>
  {#each posts as {title, slug, publishedAt, totalReactions, totalComments}}
    <li class="flex flex-row w-full items-center">
      <div class="uppercase font-mono text-xs font-bold w-20 mr-1">
        {publishedAt.toLocaleDateString('en-GB', { year: '2-digit', month: 'short', day: 'numeric' })}
      </div>
      <div class="flex-1">
        <a class="hover:underline decoration-2px" href="/posts/{slug}" sveltekit:prefetch>
          {title}        
        </a>
      </div>
      {#if totalReactions > 0}
        <a class="hover:underline font-mono text-xs mr-2 flex flex-row items-center" href="/posts/{slug}#reactions" sveltekit:prefetch> 
          {totalReactions}
          <span class="i-teenyicons-heart-solid h-3 ml-1"></span>
        </a>
      {/if}
      {#if totalComments > 0}
        <a class="hover:underline font-mono text-xs flex flex-row items-center" href="/posts/{slug}#comments" sveltekit:prefetch> 
          {totalComments}
          <span class="i-teenyicons-chat-solid h-3 ml-1"></span>
        </a>
      {/if} 
    </li>
  {:else}
    <li>No posts.</li>
  {/each}
</ul>