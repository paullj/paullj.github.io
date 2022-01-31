<script>
  export let url;
  export let totalReactions = 0;
  export let reactions = {};
  let reactionEmojis = {
		'+1': '👍',
		'-1': '👎',
		laugh: '😆',
		hooray: '🎉',
		confused: '😕',
		heart: '❤️',
		rocket: '🚀',
		eyes: '👀'
	};
</script>

{#if totalReactions > 0}
<ul class="flex decoration-none">
  {#each Object.keys(reactions) as reaction}
  {#if reactions[reaction] > 0}
  <li class='px-1 mx-1 font-mono border border-gray-200 hover:border-black box-border rounded-lg'>
    <span>{reactionEmojis[reaction]}</span>
    <span>{reactions[reaction]}</span>
  </li>
  {/if}
  {/each}
</ul>
{:else}
  <a href={url}>
    <span class="hover:underline">
      Be first the to leave a reaction.
    </span>
  </a>
  {/if}