<script>
  import Camera from "$lib/components/Camera.svelte";
  import Preview from "$lib/components/Preview.svelte";
  import { slide } from "svelte/transition";

  $: showPreview = false;
  $: capturedImageUrl = null;
</script>

{#if showPreview}
  <div
    transition:slide
    class="w-full h-full fixed top-0 z-[999] flex justify-center items-center"
  >
    <Preview
      bind:capturedImage={capturedImageUrl}
      on:close={() => {
        showPreview = false;
      }}
    />
  </div>
{/if}

<div class="w-full h-full">
  <Camera
    bind:capturedImageUrl
    on:capture={(e) => {
      capturedImageUrl = e.detail.capturedImageUrl;
      showPreview = true;
    }}
  />
</div>
