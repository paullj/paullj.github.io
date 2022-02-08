<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { theme, dark, ALL_THEMES } from '$lib/stores/theme';
  import { browser } from '$app/env';

  let prefersDarkQuery;

  let index; 
  $: $dark = $theme === 'dark' || ($theme === 'system' && prefersDarkQuery?.matches);

  $: if (browser) {
    if ($dark)
      document.documentElement.classList.add('dark');
    else
      document.documentElement.classList.remove('dark');
  }

  onMount(() => {
    index = ALL_THEMES.indexOf($theme ?? 'system');
    prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
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

  const cycleTheme = () => {
    index = (index + 1) % ALL_THEMES.length
    $theme = ALL_THEMES[index];
  }
</script>

<form on:submit|preventDefault>
  <div class="hidden">
    {#each ALL_THEMES as name, i}
    <label for={name.toLowerCase()} class="ml-2 cursor-default sr-only">{name}</label>
    <input bind:group={index} type="radio" name="nightModeCheckbox" id={name} value={i}>
    {/each}
  </div>

  <button class="relative inline-block group w-8 h-8" on:click={() => cycleTheme()}>
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
