<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { storable } from '$lib/storable';

  const preferredTheme = storable('theme');
  let darkMode = false;
  $: if (typeof window != 'undefined') {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
  onMount(() => {
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkMode = $preferredTheme ? $preferredTheme === 'dark' : darkMediaQuery.matches;
    try {
      // Chrome & Firefox
      darkMediaQuery.addEventListener('change', e => {
        darkMode = e.matches;
      });
    } catch (e1) {
      try {
        // Safari
        darkMediaQuery.addListener(e => {
          darkMode = e.matches;
        });
      } catch (e2) {
        console.error(e2);
      }
    }
  });
  const toggleMode = () => {
    darkMode = !darkMode;
    $preferredTheme = darkMode ? 'dark' : 'light';
  };
  const fadeSettings = { delay: 100, duration: 100};
</script>

<label for="nightModeCheckbox">
  <div class="cursor-pointer select-none"
      class:hover:text-orange-300={darkMode}
      class:hover:text-light-blue-600={!darkMode}>
      {#if darkMode}
        <span in:fade={fadeSettings} class="m-2 w-5 h-5 i-teenyicons-sun-outline"/>
      {:else}
        <span in:fade={fadeSettings} class="m-2 w-5 h-5 i-teenyicons-moon-outline"/>
      {/if}
    <input id="nightModeCheckbox" on:input={toggleMode} type="checkbox" class="inline sr-only" checked={darkMode} />
  </div>
  <span class="ml-2 cursor-default sr-only">Dark Mode Toggle</span>
</label>