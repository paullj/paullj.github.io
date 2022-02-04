<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { theme, dark } from '$lib/stores/theme';

  let prefersDarkQuery;

  let index = 0;
  let themes = [
    'System',
    'Light',
    'Dark' 
  ]
  $: {
    $theme = themes[index].toLowerCase();
    $dark = $theme === 'dark' || ($theme === 'system' && prefersDarkQuery?.matches);
  }

  $: if (typeof window != 'undefined') {
    if ($dark)
      document.documentElement.classList.add('dark');
    else
      document.documentElement.classList.remove('dark');
  }

  onMount(() => {
    prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    $dark = $theme ? $theme === 'dark' : prefersDarkQuery.matches;
    
    try {
      // Chrome & Firefox
      prefersDarkQuery.addEventListener('change', e => {
        if($theme === 'system') {
          $dark = e.matches;
        }
      });
    } catch (e1) {
      try {
        // Safari
        prefersDarkQuery.addListener(e => {
          if($theme === 'system') {
            $dark = e.matches;
          }       
        });
      } catch (e2) {
        console.error(e2);
      }
    }
  });

  const fadeSettings = { delay: 100, duration: 100};
</script>

<form on:submit|preventDefault>
  <div class="hidden">
    {#each themes as name, i}
    <label for={name.toLowerCase()} class="ml-2 cursor-default sr-only">{name}</label>
    <input bind:group={index} type="radio" name="nightModeCheckbox" id={name.toLowerCase()} value={i}>
    {/each}
  </div>

  <button class="relative inline-block group w-8 h-8" on:click={() => index = (index + 1) % themes.length}>
    {#if $theme === 'light'}
      <span in:fade={fadeSettings} class="inset-0 group-hover:text-orange-400 m-auto w-3/5 h-3/5 absolute i-teenyicons-sun-outline"/>
    {:else if $theme === 'dark'}
      <span in:fade={fadeSettings} class="inset-0 group-hover:text-light-blue-600 m-auto w-3/5 h-3/5 absolute i-teenyicons-moon-outline"/>
    {:else}
      <span in:fade={fadeSettings} class="bottom-0 right-0 group-hover:text-light-blue-600 absolute w-1/2 h-2/3 i-teenyicons-moon-outline"/>
      <span in:fade={fadeSettings} class="top-0 left-0 group-hover:text-orange-400 absolute w-1/2 h-2/3 i-teenyicons-sun-outline"/>
    {/if}
  </button>
</form>
