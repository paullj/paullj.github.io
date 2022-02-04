<script>
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex flex-col max-w-screen-sm min-h-screen px-4 py-2 mx-auto">
  <Header></Header>
  <main class="pt-4 sm:pt-6 flex-grow">
    <slot />
  </main>
  <Footer></Footer>
</div>

<style global>
  html {
    background-color: rgb(249, 250, 251);
    color: rgb(17, 24, 39);
  }
  
  html.dark {
    background-color: rgb(17, 24, 39);
    color: rgb(249, 250, 251);
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