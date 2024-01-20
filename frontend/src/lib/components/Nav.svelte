<script>
  import Camera from "$lib/icons/Camera.svelte";
  import Gallery from "$lib/icons/Gallery.svelte";
  import Glossary from "$lib/icons/Glossary.svelte";
  import Leaderboard from "$lib/icons/Leaderboard.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let navItems = [
    {
      path: "/leaderboard",
      name: "Leaderboard",
      icon: Leaderboard,
    },
    {
      path: "/",
      name: "Camera",
      icon: Camera,
    },
    {
      path: "/gallery",
      name: "Gallery",
      icon: Gallery,
    },
  ];
</script>

<nav class="border-t shadow-md fixed bottom-0 w-full bg-green-600 pb-8 pt-4">
  <div class="flex flex-row w-full justify-evenly items-center">
    {#each navItems as navItem}
      <button
        class="transition duration-150 ease-in-out"
        class:active={navItem.path === $page.path}
        on:click={() => goto(navItem.path)}
      >
        <svelte:component this={navItem.icon} />
      </button>
    {/each}
  </div>
</nav>
