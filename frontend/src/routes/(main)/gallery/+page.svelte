<script>
    import { onMount } from "svelte";

  const binMap = {
    R: "Recycling",
    O: "Compost",
    L: "Landfill",
  };

  const galleryObjects = [
    {
      label: "Plastic Bottle",
      bin: "R",
      points: 10,
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      label: "Plastic Bottle",
      bin: "R",
      points: 10,
      thumbnail: "https://picsum.photos/200/300",
    },
    {
      label: "Plastic Bottle",
      bin: "R",
      points: 10,
      thumbnail: "https://picsum.photos/200/300",
    },
    ];
    onMount(() => {
      fetch('http://localhost:3000/get_entries')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(entries => {
    // Handle the retrieved entries
    const imageData = entries[0].image;
   
    document.getElementById("test").src = imageData;
    console.log(entries[0].image);
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching entries:', error);
  });
    })
 

  $: totalPoints = 0;
</script>
<img id="test">
<div class="p-4 font-semibold text-xl">Total Points: {totalPoints}</div>

<div class="flex flex-wrap justify-between p-4 w-full">
  {#each galleryObjects as obj}
    <div class="flex flex-col items-center w-[47%]">
      <img
        src={obj.thumbnail}
        alt="thumbnail"
        class="w-full h-32 object-cover rounded-lg"
      />
      <div
        class="flex flex-col items-center text-[#1B4967] font-semibold w-full px-2 text-left"
      >
        <p class="flex flex-row justify-between w-full">
          <span class="max-w-[75%] break-words">{obj.label}</span>
          <span class="">{obj.points}pts</span>
        </p>
        <p class="w-full">{binMap[obj.bin]}</p>
      </div>
    </div>
  {/each}
</div>
