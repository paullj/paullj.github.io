<script lang="ts">
  import { sort } from "$lib/utils";

  export let posts: any[] = [];

  let orderBy = "newest";

  $: {
    switch (orderBy) {
      case "views":
         posts = posts.sort(sort.byViews)
        break;       
      case "reactions":
        posts = posts.sort(sort.byReaction)
        break;
      case "comments":
        posts = posts.sort(sort.byComments)
        break;
      case "oldest":
        posts = posts.sort(sort.byOldest)
        break;
      case "newest":
      default:
        posts = posts.sort(sort.byNewest)
        break;
    }
  }
</script>

<form class="no-js-hidden font-mono text-sm" on:submit|preventDefault>
  <label for="posts-filter">
    <span class="i-teenyicons-filter-outline mb-0.5 w-4 h-4" />
  </label>

  <select bind:value={orderBy} name="posts-filter" id="posts-filter" class="py-2 cursor-pointer bg-gray-50 dark:bg-gray-900 leading-none">
    <option value="newest" class="bg-gray-50 dark:bg-gray-900 p-2" selected>Newest</option>
    <option value="oldest" class="bg-gray-50 dark:bg-gray-900 p-2">Oldest</option>
    <option value="views" class="bg-gray-50 dark:bg-gray-900 p-2">Views</option>
    <option value="reactions" class="bg-gray-50 dark:bg-gray-900 p-2">Reactions</option>
    <option value="comments" class="bg-gray-50 dark:bg-gray-900 p-2">Comments</option>
  </select>
</form>