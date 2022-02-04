<script>
  import '@unocss/reset/tailwind.css';
  import 'uno.css';
  
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  
  import navigation from '$lib/stores/navigation';
  import { GOATCOUNT_SUBDOMAIN } from '$lib/siteConfig';
  
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import LoadingBar from '$lib/components/LoadingBar.svelte';
  
  onMount(() => {
    const count = document.createElement('script');
    count.async = true;
    count.src = "//gc.zgo.at/count.js"
    count.setAttribute('data-goatcounter',`https://${GOATCOUNT_SUBDOMAIN}.goatcounter.com/count`);
    count.setAttribute('data-goatcounter-settings',JSON.stringify({ no_onload: true }));
    const body = document.getElementById('content');
    body.appendChild(count);
  });

  beforeNavigate(() => $navigation = 'loading');
  afterNavigate(({ to }) => {
    // @ts-ignore
    if(window.goatcounter) {
      // @ts-ignore
      window.goatcounter.count({
        path: to.pathname,
      })
    }
    $navigation = 'loaded';
  });
</script>

{#if $navigation === 'loading'}
  <div out:fade={{ delay: 500 }}>
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