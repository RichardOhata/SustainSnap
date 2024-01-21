<script>
  import Camera from "$lib/components/Camera.svelte";
  import Preview from "$lib/components/Preview.svelte";
  import { slide } from "svelte/transition";
  import { process_image } from "$lib/utils/ai";

  $: showPreview = false;
  $: capturedImageUrl = null;
  $: loading = false;

  let data;

  const processCapture = async (e) => {
    loading = true;

    capturedImageUrl = e.detail.capturedImageUrl;
    const res = await process_image(capturedImageUrl);
    data = res;

    console.log(res);

    loading = false;
    showPreview = true;
  };
</script>

{#if showPreview}
  <div
    transition:slide
    class="w-full h-full fixed top-0 z-[999] flex justify-center items-center"
  >
    <Preview
      bind:capturedImageUrl
      bind:data
      on:close={() => {
        showPreview = false;
      }}
    />
  </div>
{/if}

<Camera on:capture={processCapture} />
