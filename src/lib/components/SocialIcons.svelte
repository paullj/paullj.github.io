<script>
  import ExternalLink from './ExternalLink.svelte';
  import { EMAIL_ADDRESS, LINKEDIN_USER, GITHUB_USER } from '$lib/siteConfig';
</script>

<div class="text-left">
  <ExternalLink class="mr-4" uri="mailto:{EMAIL_ADDRESS}?subject=Hi!" ariaLabel="Send me an email">
    <span class="i-teenyicons-at-outline w-6 h-6 hover:text-red" />
  </ExternalLink>
  <ExternalLink class="mx-4" uri="https://www.linkedin.com/in/{LINKEDIN_USER}" ariaLabel="Connect on LinkedIn">
    <span class="i-teenyicons-linkedin-outline w-6 h-6 hover:text-blue-500" />
  </ExternalLink>
  <ExternalLink class="mx-4" uri="https://www.github.com/{GITHUB_USER}" ariaLabel="See my public repos on GitHub">
    <span class="i-teenyicons-github-outline w-6 h-6 hover:text-purple" />
  </ExternalLink>
  <ExternalLink class="ml-4" uri="#" ariaLabel="Share by Email">
    <span class="font-mono inline-block text-sm align-middle decoration-wavy decoration-1 hover:underline">
      Curriculum Vitae
    </span>
  </ExternalLink>
</div>