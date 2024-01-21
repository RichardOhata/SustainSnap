<script>
  import { onMount } from "svelte";
  import Preview from "./Preview.svelte";

  /**
   * @type {HTMLVideoElement | null}
   */
  let videoSource = null;
  let loading = false;
  let cameraShown = false;
  let preview = false;
  let capturedImageUrl;
  const showVideoCamera = async () => {
    const button = document.getElementById("clickButton");
    try {
      loading = true;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      // @ts-ignore
      videoSource.srcObject = stream;
      // @ts-ignore
      videoSource.play();
      loading = false;
      cameraShown = true;
      if (button) {
        button.style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const screenCapture = () => {
    if (videoSource) {
      const canvas = document.createElement("canvas");
      canvas.width = videoSource.videoWidth;
      canvas.height = videoSource.videoHeight;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(videoSource, 0, 0, canvas.width, canvas.height);
      capturedImageUrl = canvas.toDataURL("image/png");
      preview = true;
      // Convert the canvas content to a Blob
      //   canvas.toBlob((blob) => {
      // // Create a download link
      // const link = document.createElement('a');
      // // @ts-ignore
      // link.href = URL.createObjectURL(blob);
      // link.download = 'screenshot.png';

      // // Append the link to the document and trigger a click event
      // document.body.appendChild(link);
      // link.click();

      // Remove the link from the document
      // document.body.removeChild(link);
      //   }, 'image/png');
    }
  };

  onMount(() => {
    showVideoCamera();
  });
</script>

<div class="w-full h-full object-fill">
  {#if !preview}
    {#if loading}
      <h1>Loading</h1>
    {/if}
    <!-- svelte-ignore a11y-media-has-caption -->
    <div class="relative">
      <video bind:this={videoSource} class="w-full h-[85vh] object-cover" />
      {#if cameraShown}
        <div class="absolute inset-0 flex justify-center items-center z-10">
          <button
            on:click={screenCapture}
            type="button"
            class=" outline outline-[5px] outline-offset-2 absolute bottom-5 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-7 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span class="sr-only">Icon description</span>
          </button>
        </div>
      {/if}
    </div>
  {:else}
    <Preview capturedImage={capturedImageUrl} />
  {/if}
</div>
