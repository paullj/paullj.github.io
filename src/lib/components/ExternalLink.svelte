<script lang="ts">
  export let ariaLabel: string = '';
  export let uri: string;
  let className: string = "";
  export {className as class}

  $: href = encodeURI(uri);
</script>

<a {href} class={className} target="_blank" rel="noopener" aria-label={ariaLabel}>
  <slot />
</a>