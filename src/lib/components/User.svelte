<script lang="ts">
  export let url: string;
  export let login: string;
  export let avatarUrl: string;
</script>

<div class="flex flex-row items-center">
  <a href={url} target="_blank">
    <img class="rounded-full overflow-hidden w-8" src={avatarUrl} alt="">
  </a>
  <a href={url} target="_blank" class="ml-2 font-medium hover:underline">
    {login}
  </a>
</div>