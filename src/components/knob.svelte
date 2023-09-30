<script>
  /*
  Original: https://svelte.dev/repl/fde0668b207045fa992fc04941b9508d?version=3.29.6
  */

  export let value, min, max;
  export let rotRange = 2 * Math.PI * 0.75;
  export let pixelRange = 200;
  export let startRotation = -Math.PI * 0.75;

  let startY, startValue;
  $: valueRange = max - min;
  $: rotation = startRotation + ((value - min) / valueRange) * rotRange;

  function clamp(num, min, max) {
    return Math.max(min, Math.min(num, max));
  }

  function pointerMove({ clientY }) {
    const valueDiff = (valueRange * (clientY - startY)) / pixelRange;
    value = clamp(startValue - valueDiff, min, max);
  }

  function pointerDown({ clientY }) {
    startY = clientY;
    startValue = value;
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
  }

  function pointerUp() {
    window.removeEventListener("pointermove", pointerMove);
    window.removeEventListener("pointerup", pointerUp);
  }
</script>

<div class="knob">
  <img src="/images/knob-bg.png" class="bg" />
  <div class="dial-container">
    <div
      class="dial"
      style="--rotation: {rotation}"
      on:pointerdown={pointerDown}
    >
      <img class="pointer-events-none" src="/images/dial-dot.png" />
    </div>
  </div>
  <div class="logo">
    <img src="/images/logo.png" />
  </div>
</div>

<style>
  .knob {
    @apply w-[230px] h-[291px] relative select-none;
  }
  .bg {
    @apply absolute inset-0 block pointer-events-none;
  }
  .dial-container {
    @apply absolute left-[15px] top-[15px];
  }
  .dial {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: rotate(calc(var(--rotation) * 1rad));
    transform-origin: 50% 50%;
  }
  .logo {
    @apply absolute left-0 right-0 bottom-[20px] flex flex-row justify-center pointer-events-none;
  }
  .logo img {
    @apply w-[200px];
  }
</style>
