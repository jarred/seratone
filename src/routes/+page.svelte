<script>
  import Pizzicato from "pizzicato";
  import Knob from "@bismuthsoft/svelte-dj-knob";

  // const srcFile = "/charles_aznavour-parce_que_tu_crois.mp3";
  const srcFile = "/boom_clap_bachelors-tiden_flyver.mp3";
  let initialised = false;
  /** @type {HTMLAudioElement} */
  let audioEl;
  let input;
  let mix = 0;
  let reverb;
  let flanger;
  const init = async () => {
    initialised = true;

    input = new Pizzicato.Sound(
      {
        source: "file",
        options: {
          path: srcFile,
        },
      },
      () => {
        reverb = new Pizzicato.Effects.Reverb({
          time: 2,
          decay: 2,
          reverse: false,
          mix,
        });
        flanger = new Pizzicato.Effects.Flanger({
          time: 0.45,
          speed: 0.2,
          depth: 0.8,
          feedback: 0.5,
          mix,
        });
        input.addEffect(reverb);
        input.addEffect(flanger);
        input.play();
      }
    );
  };

  const updateEffect = () => {
    if (reverb) reverb.mix = mix;
    if (flanger) flanger.mix = mix;
  };
</script>

<audio bind:this={audioEl} preload="true" src={srcFile} />

<button on:click={init}>Play</button>

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
