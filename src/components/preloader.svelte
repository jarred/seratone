<script>
  import { onDestroy, onMount } from "svelte";

  let frames = [
    "loading&nbsp;&nbsp;&nbsp;",
    "loading.&nbsp;&nbsp;",
    "loading..&nbsp;",
    "loading...",
  ];
  let frameIndex = 0;

  let int;

  onMount(() => {
    int = setInterval(update, 300);
  });

  onDestroy(() => {
    if (int) clearInterval(int);
  });

  const update = () => {
    frameIndex = (frameIndex + 1) % frames.length;
  };
</script>

<div
  class="absolute inset-0 pointer-events-none flex flex-col justify-center items-center"
>
  <span class="text-white font-mono bg-black uppercase py-1 px-2"
    >{@html frames[frameIndex]}</span
  >
</div>
