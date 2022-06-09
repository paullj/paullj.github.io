<script lang="typescript">
  import { GOATCOUNT_SUBDOMAIN } from '$lib/siteConfig';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
    
  onMount(() => {
    const count = document.createElement('script');
    count.async = true;
    count.src = "//gc.zgo.at/count.js"
    count.setAttribute('data-goatcounter',`https://${GOATCOUNT_SUBDOMAIN}.goatcounter.com/count`);
    count.setAttribute('data-goatcounter-settings',JSON.stringify({ no_onload: false }));
    const body = document.getElementById('content');
    body?.appendChild(count);
  });

  afterNavigate(({ to }) => {
    // @ts-ignore
    if(window.goatcounter) {
      // @ts-ignore
      window.goatcounter.count({
        path: to.pathname,
      })
    }
  });
</script>

