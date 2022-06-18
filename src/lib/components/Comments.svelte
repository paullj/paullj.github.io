<script lang="ts">
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { dark } from "$lib/stores/theme";
  import { browser, dev } from "$app/env";
  import { SITE_URL } from "$lib/siteConfig";

  export let user: string;
  export let repo: string;
  export let repoId: string;
  export let number: string;

  const sendMessage = (message: {}) => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe && iframe.contentWindow) { 
      iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
  }

  $: themeCss = `${dev ? $page.url.origin : SITE_URL}/comments-${$dark ? 'dark' : 'light'}.css`;
  $: if(browser) {
    sendMessage({ setConfig: { theme: themeCss }});
  }

  onMount(() => {
    const giscus = document.createElement('script');
    giscus.async = true;
    giscus.src = "https://giscus.app/client.js"
    giscus.setAttribute('data-repo',`${user}/${repo}`);
    giscus.setAttribute('data-repo-id',`${repoId}`);
    giscus.setAttribute('data-mapping', 'number');
    giscus.setAttribute('data-term', `${number}`);
    giscus.setAttribute('data-reactions-enabled', '1');
    giscus.setAttribute('data-emit-metadata', '0');
    giscus.setAttribute('data-input-position', 'top');
    giscus.setAttribute('data-theme', themeCss);
    giscus.setAttribute('data-lang', 'en');
    giscus.setAttribute('crossorigin', 'anonymous');
    
    const body = document.getElementById('comments');
    if(body) {
      body.appendChild(giscus);
    }
  });
</script>


<noscript>
  <div class="font-mono text-center text-red text-sm">
    Enable Javascript to see comments, or click <a class="underline decoration-2 decoration-dotted hover:decoration-solid" href="https://github.com/{user}/{repo}/discussions/{number}">here</a>
  </div>
</noscript>

<span id="comments" />
