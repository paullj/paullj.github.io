<script lang="ts">
  import ToggleDarkMode from './ToggleDarkMode.svelte';
  import { page } from '$app/stores';
  $: currentPath = $page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')) || $page.url.pathname;
</script>

<header class="flex flex-row w-full py-4 items-center">
  <nav class="flex-1 text-lg sm:text-base">
    {#if currentPath !== '/'}
      <span class="i-teenyicons-arrow-left-solid my-1 mr-1"/>
      <a href="/" sveltekit:prefetch class="text-lg hover:underline sm:text-base">
        Back
      </a>
    {/if}
  </nav>
  <div class="no-js-hidden">
    <ToggleDarkMode />
  </div>
</header>