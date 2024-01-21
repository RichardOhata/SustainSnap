<script>
    import { onMount } from "svelte";

    export let capturedImage;

    onMount(() => {
        const frame = document.getElementById("frame");
        const img = frame.querySelector("img");

        if (img) {
            // Set the src attribute of the img element to the capturedImage
            img.src = capturedImage;
        }
    });
</script>

<div id="frame">
    <img alt="previewImage">
</div>

<style>

#frame img {
    /* width: 100%;
    height: 100%; */
    object-fit: cover; 
    border-radius: 50%; 
}
</style>
