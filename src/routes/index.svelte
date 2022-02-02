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

  let orderBy = "newest";
  export let posts = [];

  $: {
    switch (orderBy) {
      case "loved":
        posts = posts.sort((a, b) => b.reactions - a.reactions)
        break;
      case "popular":
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

<h1 class="py-12 font-bold text-4xl whitespace-pre-line leading-none">{ SITE_TITLE.replace(' ',"\n") }</h1>

<form class="text-xl mb-2 inline-block border-b-2 border-dotted hover:border-solid" on:submit|preventDefault>
  <div class="relative inline-block mr-2">
    <select bind:value={orderBy} name="posts-filter" id="posts-filter" class="appearance-none bg-transparent leading-none">
      <option value="newest" class="bg-white pr-2" selected>Newest</option>
      <option value="oldest" class="bg-white pr-2">Oldest</option>
      <option value="loved" class="bg-white pr-4">Loved</option>
      <option value="popular" class="bg-white pr-4">Popular</option>
    </select> 
    <span class="inline-block absolute bottom-0 right-0 i-teenyicons-down-solid w-2 h-full pointer-events-none">
    </span>
  </div>   
  <label for="posts-filter">Posts</label>
</form>

<ul class="text-lg leading-none">
  {#each posts as {title, slug, publishedAt, reactions, comments, category}}
    <li class="flex flex-row w-full items-center justify-start mb-4">
      <span class="leading-none text-gray-400 uppercase tracking-wide text-sm font-extrabold">
        {publishedAt.toLocaleDateString('en-GB', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}
      </span>
      {#if category.toLowerCase().includes("draft")}
        <span class="ml-2 text-xs uppercase font-mono font-bold border-2 px-1 rounded-md text-yellow-500">Draft</span>
      {/if}
      <span class="ml-2 align-middle">
        <a class="hover:underline decoration-2px" href="/posts/{slug}" sveltekit:prefetch>
          {title}        
        </a>
      </span>
      <div class="self-end flex flex-row text-gray-400 font-bold decoration-2 font-mono text-xs ml-4 gap-x-2">
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