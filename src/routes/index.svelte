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


<script>
  import Meta from 'svelte-meta';
  import { SITE_TITLE, SITE_URL, SITE_DESCRIPTION, DEFAULT_IMAGE } from '$lib/siteConfig';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import SocialIcons from '$lib/components/SocialIcons.svelte';

  let orderBy = "newest";
  export let posts = [];

  $: {
    switch (orderBy) {
      case "reactions":
        posts = posts.sort((a, b) => b.reactions - a.reactions)
        break;
      case "comments":
        posts = posts.sort((a, b) => b.comments - a.comments)
        break;
      case "oldest":
        posts = posts.sort((a, b) => a.publishedAt - b.publishedAt)
        break;
      case "newest":
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

<h1 class="mt-12 mb-4 font-bold font-serif text-4xl whitespace-pre-line leading-none">{ SITE_TITLE.replace(' ',"\n") }</h1>

<div class="mt-4 mb-16">
  <SocialIcons />
</div>

<div class="flex flex-row items-center mb-2">
  <div class="flex-1">
    <h2 class="inline-block font-serif text-xl">Posts</h2>
    <ExternalLink class="inline-block ml-2" uri="" ariaLabel="RSS feed">
      <span class="i-teenyicons-rss-solid mb-1 w-3 h-3 hover:text-orange" />
    </ExternalLink>
  </div>

  <form class="font-mono text-sm" on:submit|preventDefault>
    <label for="posts-filter"> Sort by</label>
    <select bind:value={orderBy} name="posts-filter" id="posts-filter" class="py-2 cursor-pointer underline underline-offset-1.5 bg-transparent decoration-dotted decoration-2 leading-none">
      <option value="newest" class="bg-white pr-2" selected>Newest</option>
      <option value="oldest" class="bg-white pr-2">Oldest</option>
      <option value="reactions" class="bg-white pr-2">Reactions</option>
      <option value="comments" class="bg-white pr-2">Comments</option>
    </select>
  </form>
</div>

<ul class="text-lg leading-none">
  {#each posts as {title, slug, publishedAt, reactions, comments, category}}
    <li class="flex flex-row w-full items-center justify-start mb-2 pb-1">
      <span class="leading-none text-gray-400 uppercase tracking-wide text-sm font-extrabold">
        {publishedAt.toLocaleDateString('en-GB', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}
      </span>
      {#if category.toLowerCase().includes("draft")}
        <span class="ml-4 text-xs font-mono font-bold border-2 box-border px-0.5 rounded-md text-yellow-500">Draft</span>
      {/if}
      <span class="flex-1 ml-4 align-middle">
        <a class="hover:underline decoration-2px" href="/posts/{slug}" sveltekit:prefetch>
          {title}        
        </a>
      </span>
      <div class="flex flex-row text-gray-400 font-bold decoration-2 font-mono text-xs ml-6 gap-x-2">
        {#if reactions > 0}
          <a class="flex flex-row items-center hover:underline" href="/posts/{slug}#reactions" sveltekit:prefetch> 
            {reactions}
            <span class="i-teenyicons-heart-solid h-3 ml-1"></span>
          </a>
        {/if}
        {#if comments > 0}
          <a class="flex flex-row items-center hover:underline" href="/posts/{slug}#comments" sveltekit:prefetch> 
            {comments}
            <span class="i-teenyicons-chat-solid h-3 ml-1"></span>
          </a>
        {/if} 
      </div>
    </li>
  {:else}
    <li>No posts.</li>
  {/each}
</ul>