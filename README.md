# Seratone

An audio effects experiment

## Plan (hours)

1: Research, project setup  
2-3: Technical setup, proof of concept  
4-6: Design and implementation

## Caveats / details

- Requires a modern browser, and headphones on mobile
- Three source tracks, selected randomly
- Knob component is [based on this](https://svelte.dev/repl/fde0668b207045fa992fc04941b9508d?version=3.29.6), and not very accessible
- Knob rotation is linear, not circlar. [This](https://denilson.sa.nom.br/html5-knob/) looks like a good implementation, but is less usuable on mobile
- ASCII is powered by [this engine](https://play.ertdfgcvb.xyz/abc.html) and interpolates between [these](https://play.ertdfgcvb.xyz/#/src/sdf/circle) [two](https://play.ertdfgcvb.xyz/#/src/demos/plasma) programmes (with modifications).
- Stores state against `window` object which is a bit hacky
