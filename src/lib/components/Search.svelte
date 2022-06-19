<script lang="ts">
  import { onMount } from 'svelte';
  import Fuse from 'fuse.js';

  let fuse: Fuse<any>;
  let pattern: string;
  let element: HTMLInputElement;

  export let posts: any[] = [];
  export let filteredPosts: any[] = [];

  $: filteredPosts = pattern ? fuse.search(pattern).map(({item}) => ({...item})) : posts;

  onMount(() => {
    fuse = new Fuse(posts, {
      keys: [
        "title",
      ]
    });
  })

</script>

<form class="no-js-hidden font-mono text-sm" on:submit|preventDefault>
  <label for="search">
    <span class="i-teenyicons-search-outline w-4 h-4" />
  </label>

  <input bind:this={element} type="text" name="search" class="bg-transparent outline-none w-36 mr-4" placeholder="Type / to Search" bind:value={pattern}>
</form>

<svelte:body
  on:keydown={
    (event) => { 
      if(event.key === '/' && document.activeElement !== element) {
        event.preventDefault()
        element.focus();
        element.select();
      }
    }
  }
/>