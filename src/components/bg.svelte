<script>
  import { run } from "$lib/play.core/src/run";
  import { onMount } from "svelte";
  // import * as program from "../ascii/circles";

  /** @type {"ready" | "init" | "active"} */
  export let state = "ready";
  export let value;
  /** @type {HTMLPreElement} */
  let el;

  onMount(async () => {
    const program = await import("../ascii/bg");
    run(program, { element: el, allowSelect: true, radius: value });
  });
</script>

<pre
  bind:this={el}
  class="absolute inset-0 bg-black text-[#333] pointer-events-none z-0"
/>
