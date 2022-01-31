<script>
  import Reactions from "./Reactions.svelte";

  export let url;
  export let user;
  export let content;
  export let totalReactions;
  export let reactions;
  export let createdAt;
  export let updatedAt;
</script>


<div class="border-1 p-2 border-gray mb-2 rounded">
  <div class="">
    <img class="rounded-full overflow-hidden w-12" src={user.avatar} alt="">
  </div>
  <div class="">
    @{user.login}
  </div>
  <span></span>
  <div class="prose">
    {@html content}
  </div>
  <span></span>
  <div>
    <Reactions {url} {totalReactions} {reactions}></Reactions>
  </div>
</div>
