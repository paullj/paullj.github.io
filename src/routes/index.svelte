<script lang="ts" context="module">
  import type { Load } from './__types/index';
  import { byNewest } from '$lib/utils/sort';
  import { filter } from "$lib/stores/filter";

  export const prerender = true;
	export const hydrate = true;

  export const load: Load = ({ props, url }) => {
    // if (url.searchParams.has("filter")) {
    //   filter.internalSet(url.searchParams.get("filter")!);
    // }

    let totalPages = Math.ceil(props.posts.length / 5)
    let currentPage = 1;
    
    if(browser && url.searchParams.has("page")) {
      currentPage = Number.parseInt(url.searchParams.get("page")!);
      
      if(currentPage < 1 || currentPage > totalPages) {
        currentPage = Math.min(Math.max(currentPage, 1), totalPages);
        
        return {
          status: 300,
          redirect: `?page=${currentPage}`
        }
      }
    }


    props = {
      ...props,
      currentPage,
      posts: props.posts.map((post: any) => ({
        ...post,
        createdAt: new Date(post.createdAt),
        publishedAt: new Date(post.publishedAt),
        updatedAt: new Date(post.lastEditedAt)
      })).sort(byNewest)
    }
    return { 
      props, 
    }
  }
</script>


<script lang="ts">
  import Meta from 'svelte-meta';

  import { SITE_TITLE, SITE_URL, SITE_DESCRIPTION, DEFAULT_IMAGE } from '$lib/siteConfig';
  import hydrateAction from '$lib/actions/hydrate';
  import { getViewCount, paginate, fuzzy } from '$lib/utils';
  
  import Search from '$lib/components/Search.svelte';
  import SortBy from '$lib/components/SortBy.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import SocialIcons from '$lib/components/SocialIcons.svelte';
import { browser } from '$app/env';

  export let currentPage: number;
  export let posts: any = [];
  
  let filteredPosts: any[];
  
  let pageSize = 5;

  $: if($filter) {
    filteredPosts = posts.filter(({title}) => fuzzy($filter, title));
  } else {
    filteredPosts =  paginate(posts, pageSize, currentPage);
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
    <a class="inline-block ml-2" href="/rss.xml" aria-label="RSS feed">
      <span class="i-teenyicons-rss-solid mb-1 w-3 h-3 hover:text-orange" />
    </a>
  </div>

  <Search></Search>
  <SortBy bind:posts={posts}></SortBy>
</div>

<ul class="text-lg">
  {#each filteredPosts as {title, slug, publishedAt, viewCount, reactions, comments, category}}
    <li class="flex flex-col sm:flex-row sm:space-x-2 sm:items-center">
      <div class="mr-2 min-w-24">
        <date class="block leading-none text-gray-400 uppercase tracking-wide text-xs font-extrabold">
          {publishedAt.toLocaleDateString('en-GB', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}
        </date>
      </div>
      <div class="flex-1 mb-2 sm:mb-0 align-middle truncate">
        <a class="group decoration-2px" href="/posts/{slug}" sveltekit:prefetch>
          <span class="group-hover:underline">
            {title}
          </span>
        </a>
      </div>
      <div class="hidden sm:flex flex-row text-gray-400 font-bold decoration-2 font-mono text-xs ml-6 gap-x-2">
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
        <span class="flex flex-row items-center" > 
          <span use:hydrateAction={async () => await getViewCount(slug) || false }>
            {viewCount}
          </span>
          <span class="i-teenyicons-eye-solid h-3 ml-1"></span>
        </span>
      </div>
    </li>
  {:else}
    <li>No posts to show!</li>
  {/each}
</ul>

<div class="my-4">
  {#if $filter}
    <div class="font-mono text-xs">
      {filteredPosts.length}
      {#if filteredPosts.length > 1}
        Results
      {:else}
        Result
      {/if}
    </div>
  {:else}
    <Pagination totalItems={posts.length} {pageSize} {currentPage}></Pagination>
  {/if}
</div>