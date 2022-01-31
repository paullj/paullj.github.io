<script>
  import Comment from './Comment.svelte';

  export let comments = [];
	export let issueUrl;

</script>

{#each comments as comment}
  <Comment {...comment} />
{:else}
  <a href="{issueUrl}#issuecomment-new" rel="external" target="_blank">
    No comments, leave a comment by clicking here!
  </a>
{/each}

