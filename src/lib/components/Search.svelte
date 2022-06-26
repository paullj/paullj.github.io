<script lang="ts">
  import { filter } from '$lib/stores/filter';
  
  let element: HTMLInputElement;
</script>

<form class="hidden sm:block no-js-hidden font-mono text-sm" on:submit|preventDefault={() => { if(document.activeElement instanceof HTMLElement) document.activeElement.blur() }}>
  <label for="search">
    <span class="i-teenyicons-search-outline w-4 h-4" />
  </label>

  <input bind:this={element} type="text" name="search" class="bg-transparent outline-none w-36 mr-4" placeholder="Type / to Search" bind:value={$filter}>
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