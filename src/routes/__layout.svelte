<script>
  import Header from '$lib/components/Header.svelte';

  import '@unocss/reset/tailwind.css';
  import 'uno.css';
</script>

<div class="flex flex-col max-w-screen-sm min-h-screen px-4 py-2 mx-auto">
  <Header></Header>
  <main class="pt-4 sm:pt-6">
    <slot />
  </main>
  <footer></footer>
</div>

<style global>
  html {
    background-color: white;
    color: black;
  }
  
  html.dark {
    background-color: black;
    color: white;
  }
</style>

<!-- FIXME: this is not working for some reason.
  probs a better idea to make it global too and less hacky -->
<noscript>
  <style global>
    .no-js-hidden {
      @apply hidden;
    }
  </style>
</noscript>