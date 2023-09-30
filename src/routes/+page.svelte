<script>
  import { browser } from "$app/environment";
  import Pizzicato from "pizzicato";
  import Bg from "../components/bg.svelte";
  import Knob from "../components/knob.svelte";
  import Preloader from "../components/preloader.svelte";
  import { onDestroy, onMount } from "svelte";

  let fileOptions = [
    "mp3/charles_aznavour-parce_que_tu_crois.mp3",
    "mp3/boom_clap_bachelors-tiden_flyver.mp3",
    "mp3/onset_music_group-amaphupho.mp3",
  ];

  const srcFile = fileOptions[Math.floor(Math.random() * fileOptions.length)];

  /** @type {"loading" | "ready" | "playing"} */
  let state = "loading";
  let input;
  let mix = 0;
  let reverb;

  $: mix, updateEffect();

  const init = async () => {
    state = "playing";
    window.state = state;
    input.play();
  };

  const updateEffect = () => {
    if (reverb) reverb.mix = mix;
    if (browser) {
      window.mix = mix;
    }
  };

  onMount(() => {
    window.state = state;
    window.mix = 0;
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
        window.state = state;
        reverb = new Pizzicato.Effects.Reverb({
          time: 1.333,
          decay: 4,
          reverse: true,
          mix,
        });
        input.addEffect(reverb);
      }
    );
  });

  onDestroy(() => {
    if (browser) input.disconnect();
  });
</script>

<main class="absolute inset-0 bg-black text-white font-mono overflow-hidden">
  {#if browser}
    <div class="absolute inset-0" style={`opacity: ${0.2 + mix * 0.8};`}>
      <Bg value={mix} />
    </div>
  {/if}

  {#if state === "loading"}
    <Preloader />
  {:else if state === "ready"}
    <button
      class="appearance-none absolute inset-0 h-full w-full flex flex-col justify-center items-center font-ocrb"
      on:click={init}
      ><span class="block text-white font-mono bg-black uppercase py-1 px-2"
        >Tap to begin</span
      ></button
    >
  {:else}
    <div
      class="absolute left-0 right-0 top-[90px] bottom-0 justify-center flex flex-col items-center"
    >
      <Knob bind:value={mix} max={1} min={0} pixelRange={200} />
    </div>
  {/if}
</main>

<svelte:head>
  <title>Seratone</title>
</svelte:head>
