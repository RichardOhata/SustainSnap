<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Upload from "../icons/Upload.svelte";

  /**
   * @type {HTMLVideoElement | null}
   */
  let videoSource = null;
  let loading = false;
  let cameraShown = false;
  let preview = false;
  let capturedImageUrl;

  const dispatch = createEventDispatcher();

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

      console.log(videoSource.videoWidth, videoSource.videoHeight, "size (in mb):", videoSource.videoWidth * videoSource.videoHeight * 4 / 1000000);

      canvas.width = videoSource.videoWidth / 2;
      canvas.height = videoSource.videoHeight / 2;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(videoSource, 0, 0, canvas.width, canvas.height);
      capturedImageUrl = canvas.toDataURL("image/png");
      preview = true;

      dispatch("capture", {
        capturedImageUrl,
      });

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

<div class="w-full h-full object-fill overflow-clip">
  {#if loading}
  <div class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style="background: rgba(0, 0, 0, 0.3);">
    <div class="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
      <div class="loader-dots block relative w-20 h-5 mt-2">
        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
        <div class="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div class="text-gray-500 text-xs font-light mt-2 text-center">
        Please wait...
      </div>
    </div>
    </div>
  {/if}
  <!-- svelte-ignore a11y-media-has-caption -->
  <div class="relative overflow-clip">
    <video bind:this={videoSource} class="w-full h-screen object-cover" />
    {#if cameraShown}
      <div
        class="absolute bottom-40 flex justify-center items-end z-10 h-full w-full"
      >
        <div class="flex flex-row items-center gap-4">
          <span class="w-10">&nbsp;</span>
          <button
            class="w-20 aspect-square border-4 border-white rounded-full"
            on:click={screenCapture}>&nbsp;</button
          >
          <button class="" on:click={() => {}}>
            <Upload />
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>


<style>
/* Animation styling */
  .loader-dots div {
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .loader-dots div:nth-child(1) {
      left: 8px;
      animation: loader-dots1 0.6s infinite;
  }
  .loader-dots div:nth-child(2) {
      left: 8px;
      animation: loader-dots2 0.6s infinite;
  }
  .loader-dots div:nth-child(3) {
      left: 32px;
      animation: loader-dots2 0.6s infinite;
  }
  .loader-dots div:nth-child(4) {
      left: 56px;
      animation: loader-dots3 0.6s infinite;
  }
  @keyframes loader-dots1 {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
  }
  @keyframes loader-dots3 {
      0% {
          transform: scale(1);
      }
      100% {
          transform: scale(0);
      }
  }
  @keyframes loader-dots2 {
      0% {
          transform: translate(0, 0);
      }
      100% {
          transform: translate(24px, 0);
      }
  }
  </style>