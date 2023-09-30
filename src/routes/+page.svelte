<script>
  import { browser, dev, building, version } from "$app/environment";
  import Pizzicato from "pizzicato";
  import Knob from "@bismuthsoft/svelte-dj-knob";
  import Bg from "../components/bg.svelte";
  import Logo from "../components/logo.svelte";
  import Preloader from "../components/preloader.svelte";
  import { onMount } from "svelte";

  const srcFile = "/charles_aznavour-parce_que_tu_crois.mp3";
  // const srcFile = "/boom_clap_bachelors-tiden_flyver.mp3";

  /** @type {"loading" | "ready" | "playing"} */
  let state = "loading";
  /** @type {HTMLAudioElement} */
  let audioEl;
  let input;
  let mix = 0;
  let reverb;

  const init = async () => {
    state = "playing";
    input.play();
  };

  const updateEffect = () => {
    if (reverb) reverb.mix = mix;
  };

  onMount(() => {
    input = new Pizzicato.Sound(
      {
        source: "file",
        options: {
          path: srcFile,
          loop: true,
        },
      },
      () => {
        state = "ready";

        reverb = new Pizzicato.Effects.Reverb({
          time: 1.333,
          decay: 4,
          reverse: true,
          mix,
        });
        input.addEffect(reverb);
        // input.addEffect(flanger);
      }
    );
  });
</script>

<main class="absolute inset-0 bg-black text-white font-mono">
  {#if browser}
    <Bg value={mix} />
  {/if}

  {#if state === "loading"}
    <Preloader />
  {:else if state === "ready"}
    <button class="absolute inset-0 block" on:click={init}
      ><span
        class="text-white font-mono bg-black uppercase py-1 px-2 cursor-default"
        >Tap to begin</span
      ></button
    >
  {:else}
    <div class="relative text-red">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        on:input={updateEffect}
        bind:value={mix}
      />

      <Knob
        min={0}
        max={1}
        step={0.01}
        bind:value={mix}
        lockCursor={false}
        size="10rem"
        strokeWidth={10}
        bgColor="#AAA"
        fgColor="red"
      />
    </div>
  {/if}
  <Logo />
</main>
