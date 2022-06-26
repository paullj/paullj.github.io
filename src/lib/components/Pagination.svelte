<script lang="ts">
  export let pageSize = 0;
  export let currentPage = 0;
  export let totalItems = 0;

  let totalPages = Math.ceil(totalItems / pageSize)

  $: currentItems = Math.min(currentPage * pageSize, totalItems) - (currentPage-1) * pageSize;
  $: previousPage = currentPage > 1 ? currentPage - 1 : 1;
  $: nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
</script>

<div class="flex justify-between items-center font-mono text-xs">
  <div class="font-mono text-xs">
    Showing {currentItems} of {totalItems}
  </div>
  <nav class="" aria-label="Page navigation">
    <ul class="flex list-none items-center">
      <li class="mr-2">
        <span class="i-teenyicons-left-outline"></span>
        <a class="hover:underline underline-1.5" href="?page={previousPage}">
          Previous
        </a>
      </li>
      <li class="mx-2 text-sm">
        {currentPage}
      </li>

      <li class="ml-2">
        <a class="hover:underline underline-1.5" href="?page={nextPage}">
          Next
        </a>
        <span class="i-teenyicons-right-outline"></span>
      </li>
    </ul>
  </nav>
</div>