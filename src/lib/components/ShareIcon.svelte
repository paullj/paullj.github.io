<script>
  export let ariaLabel = '';
  export let uri;
  let className = "";
  export {className as class}

  $: href = encodeURI(uri);
</script>

<a {href} class={className} target="_blank" rel="noopener" aria-label={ariaLabel}>
  <slot />
</a>