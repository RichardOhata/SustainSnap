<script>
  import XCircle from "$lib/icons/XCircle.svelte";
  import { createEventDispatcher } from "svelte";

  export let capturedImageUrl;
  export let data;

  const binMap = {
    R: "Recycling",
    O: "Compost",
    L: "Landfill",
  };

  let imgElement;

  const dispatch = createEventDispatcher();
</script>

<div
  class="bg-white rounded-lg shadow-lg h-[80vh] w-full mx-4 flex flex-col justify-between p-4"
>
  <div class="w-full flex items-center justify-center">
    {#key capturedImageUrl}
      <img
        src={capturedImageUrl}
        alt="previewImage"
        class="rounded-full w-[80%] aspect-square object-cover"
        bind:this={imgElement}
      />
    {/key}
  </div>

  <div class="flex flex-col">
    <span>{data?.label}</span>
    <span>{binMap[data?.bin]}</span>
    <span>{data?.fact}</span>
  </div>

  <div>
    <button
      class="w-full flex items-center justify-center"
      on:click={() => {
        dispatch("close");
      }}
    >
      <XCircle />
    </button>
  </div>
</div>
