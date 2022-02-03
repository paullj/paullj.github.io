<script lang="ts">
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { theme } from "$lib/stores/theme";
import { browser } from "$app/env";

  export let user;
  export let repo;
  export let repoId;
  export let number;

  const sendMessage = (message) => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (!iframe)
      return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }

  $: themeCss = `${$page.url.origin}/comments-${$theme}.css`;
  $: {
    if(browser)
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
    body.appendChild(giscus);
  });
</script>

<span id="comments" />
