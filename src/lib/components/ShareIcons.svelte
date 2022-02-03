<script>
  import ExternalLink from "./ExternalLink.svelte";
  import { page } from '$app/stores';

  export let title;
  export let description;
</script>

<div class="text-right">
  <span class="font-mono text-xs">Share via</span>
  <ExternalLink class="mx-2" uri={`mailto:?subject=From paullj.github.io: ${title}&body=Here is a post from Paul Lavender-Jones's blog that might interest you: \n${title}\n${description}\n${$page}`} ariaLabel="Share by Email">
    <span class="i-teenyicons-envelope-outline w-4 h-4 hover:text-red" />
  </ExternalLink>
  <ExternalLink class="mx-2" uri={`https://twitter.com/intent/tweet/?text=${title}\n${description}&url=${$page.url}`} ariaLabel="Share on Twitter">
    <span class="i-teenyicons-twitter-outline w-4 h-4 hover:text-blue-400" />
  </ExternalLink>
  <ExternalLink class="mx-2" uri={`https://facebook.com/sharer/sharer.php?u=${$page.url}`} ariaLabel="Share on Facebook">
    <span class="i-teenyicons-facebook-outline w-4 h-4 hover:text-blue-600" />
  </ExternalLink>
  <ExternalLink class="mx-2" uri={`https://www.linkedin.com/sharing/share-offsite/?url=${$page.url}`} ariaLabel="Share on LinkedIn">
    <span class="i-teenyicons-linkedin-outline w-4 h-4 hover:text-blue-500" />
  </ExternalLink>
</div>