<script>
  import User from "$lib/icons/User.svelte";
  import { goto } from "$app/navigation";
</script>

<header class="border-b shadow-md fixed top-0 w-full bg-green-600 p-4">
  <div class="flex flex-row w-full justify-between items-center">
    <img src="" alt="logo" />
    <span class="text-xl text-white font-semibold"> Lorem ipsum </span>
    <button
      class="transition duration-150 ease-in-out"
      on:click={() => goto("/profile")}
    >
      <User />
    </button>
  </div>
</header>
