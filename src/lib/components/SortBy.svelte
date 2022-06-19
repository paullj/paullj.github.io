<script lang="ts">
  export let filteredPosts: any[] = [];

  let orderBy = "newest";

  $: {
    switch (orderBy) {
      case "views":
         filteredPosts = filteredPosts.sort((a, b) => b.viewCount - a.viewCount)
        break;       
      case "reactions":
        filteredPosts = filteredPosts.sort((a, b) => b.reactions - a.reactions)
        break;
      case "comments":
        filteredPosts = filteredPosts.sort((a, b) => b.comments - a.comments)
        break;
      case "oldest":
        filteredPosts = filteredPosts.sort((a, b) => a.publishedAt - b.publishedAt)
        break;
      case "newest":
      default:
        filteredPosts = filteredPosts.sort((a, b) => b.publishedAt - a.publishedAt)
        break;
    }
  }
</script>

<form class="no-js-hidden font-mono text-sm" on:submit|preventDefault>
  <label for="posts-filter">
    <!-- Sort by -->
    <span class="i-teenyicons-filter-outline mb-0.5 w-4 h-4" />
  </label>

  <select bind:value={orderBy} name="posts-filter" id="posts-filter" class="py-2 cursor-pointer underline underline-offset-1.5 bg-transparent decoration-dotted decoration-2 leading-none">
    <option value="newest" class="bg-white pr-2" selected>Newest</option>
    <option value="oldest" class="bg-white pr-2">Oldest</option>
    <option value="views" class="bg-white pr-2">Views</option>
    <option value="reactions" class="bg-white pr-2">Reactions</option>
    <option value="comments" class="bg-white pr-2">Comments</option>
  </select>
</form>