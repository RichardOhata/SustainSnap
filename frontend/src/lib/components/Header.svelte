<script>
  import User from "$lib/icons/User.svelte";
  import { goto } from "$app/navigation";
  import Plant from "$lib/icons/Plant.svelte";
</script>

<header class="border-b shadow-md fixed top-0 w-full bg-[#223D23] p-4">
  <div class="flex flex-row w-full justify-between items-center">
    <Plant />
    <span class="text-xl text-white font-lemon"> Clean Sweep </span>
    <button
      class="transition duration-150 ease-in-out border border-white rounded-full object-cover"
      on:click={() => goto("/profile")}
    >
      <User />
    </button>
  </div>
</header>
