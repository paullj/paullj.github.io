<script>
  export let name;
  export let login;
  export let avatar;
</script>

<div class="flex">
  <img class="rounded-full overflow-hidden w-12" src={avatar} alt="">
  <div class="ml-4">
    {#if name}
      <span>
        {name}
      </span>
    {/if}
    <span>
      @{login}
    </span>
  </div>
</div>