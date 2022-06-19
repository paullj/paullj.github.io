<script>
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  import './layout.css';
 
  import { fade } from 'svelte/transition';
  
  import navigation from '$lib/stores/navigation';
  import { afterNavigate, beforeNavigate } from '$app/navigation';

  import Analytics from '$lib/components/Analytics.svelte';
  import LoadingBar from '$lib/components/LoadingBar.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  beforeNavigate(() => $navigation = 'loading');
  afterNavigate(() => $navigation = 'loaded');
</script>

<Analytics />

{#if $navigation === 'loading'}
  <div out:fade={{ delay: 100}}>
    <LoadingBar />
  </div>
{/if}

<div id="content" class="flex flex-col max-w-screen-sm min-h-screen px-4 py-2 mx-auto">
  <Header></Header>
  <main class="pt-4 sm:pt-6 flex-grow">
    <slot />
  </main>
  <Footer></Footer>
</div>

<!-- FIXME: this is not working for some reason.
  probs a better idea to make it global too and less hacky -->
<noscript>
  <style>
    :global(.no-js-hidden) {
      display: none !important;
    }
  </style>
</noscript>