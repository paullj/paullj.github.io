<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export const load = async () => {
    return {
      status: 303,
      redirect: "/"
    }
  }
</script>