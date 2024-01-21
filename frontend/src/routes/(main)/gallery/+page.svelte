<script>
    import { onMount } from "svelte";
    import { getUserEntries } from "$lib/utils/user_entry.api.js";  

  const binMap = {
    R: "Recycling",
    O: "Compost",
    L: "Landfill",
  };
  let totalPoints = 0;
  let galleryObjects = [
    // {
    //   label: "Plastic Bottle",
    //   bin: "R",
    //   points: 10,
    //   thumbnail: "https://picsum.photos/200/300",
    // },
    // {
    //   label: "Plastic Bottle",
    //   bin: "R",
    //   points: 10,
    //   thumbnail: "https://picsum.photos/200/300",
    // },
    // {
    //   label: "Plastic Bottle",
    //   bin: "R",
    //   points: 10,
    //   thumbnail: "https://picsum.photos/200/300",
    // },
    ];
    onMount(async() => {
      try {
      const {entries, response} = await getUserEntries();
   
      console.log(entries);
    if (response.ok) {
      galleryObjects = entries.map(entry => ({
      label: entry.label,
      points: entry.points,
      thumbnail: entry.image,
      bin: entry.bin
    }));
    totalPoints = galleryObjects.reduce((sum, entry) => sum + parseInt(entry.points), 0);
    
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
  });

    

</script>
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
