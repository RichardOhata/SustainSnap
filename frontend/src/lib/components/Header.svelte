<script>
  import User from "$lib/icons/User.svelte";
  import { goto } from "$app/navigation";
  import Plant from "$lib/icons/Plant.svelte";
</script>

<header class="border-b shadow-md fixed top-0 w-full bg-[#223D23] p-4 z-50">
  <div class="flex flex-row w-full justify-between items-center">
    <Plant />
    <span class="text-xl text-white font-lemon"> Sustain Snap </span>
    <button
      class="transition duration-150 ease-in-out border border-white rounded-full object-cover"
      on:click={() => {
        if (localStorage.getItem("username")) {
          goto("/profile");
        } else {
          goto("/login");
        }
      }}
    >
      <User />
    </button>
  </div>
</header>
