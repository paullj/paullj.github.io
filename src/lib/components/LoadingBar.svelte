<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import navigation from '$lib/stores/navigation';
 
  const progress = tweened(0, {
    duration: 3500,
    easing: cubicOut
  });

  onMount(() => {
    const unsubscribe = navigation.subscribe((state) => {
      if (state === 'loaded') {
        progress.set(1, { duration: 150 });
      }
    });
    progress.set(0.7);
    return () => {
      unsubscribe()
    }
  });


  beforeNavigate(() => $navigation = 'loading');
  afterNavigate(() => $navigation = 'loaded');
</script>

<div class="fixed inset-0 h-1">
    <div class="h-full bg-gray-200 dark:bg-gray-700 progress" style={`--width: ${$progress * 100}%`} />
</div>

<style>
  .progress {
    width: var(--width);
  }
</style>