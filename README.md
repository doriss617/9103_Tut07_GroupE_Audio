## Audio-Reactive “Flow of Life”

This artwork is an audio-reactive generative animation that transforms the melody and flow of a musical track into a dynamic visual mandala made of rotating rays, pulsing blobs, and drifting sparks. Each visual layer reacts to different parts of the sound spectrum, causing the scene to pulse, glow, and shift in sync with the music. Together, these movements draw audiences into an immersive experience that reflects a sense of life, fate, and memory.

---

## How to run and interact

1. **Open the folder in Visual Studio Code**
2. Right‑click `index.html` → **“Open with Live Server.”**
3. Page opens full‑screen; music is paused at first load.
4. Click **Play / Pause** (top‑left).
5. While the track plays, observe how

   * softly glowing **blobs** breathe in and out,
   * **radiant** spokes rotate and pulse,
   * drifting **sparks** leave faint tails,
   * brief **flashes** appear on every accented beat.


---

## Individual approach – why audio?

I chose the track **“Town, Flow of Time, People”** from the animation series Clannad to reflect the cyclical nature of the selected artwork inspiration. The slow tempo, soft harp, woodwinds, and ambient textures of the piece mirror the passage of time and the quiet rhythm of fate. The music evokes a sense of stillness and continuity, where towns fade, people change, yet life quietly endures and returns(reflecting the song name).

By pairing this track with motion, it stimulates emotional depth: as the wheel turns, elements rise and fade, and the whole scene *breathes* in harmonies with the theme of *Wheels of Fortune*.

![Town, Flow of Time, People - Clannad](assets/clannad.jpg)
---

## Audio‑visual mapping 
To reflect the themes of Clannad’s track and the Wheel of Fortune artwork, the code maps audio features directly to visual elements that represent time, fate, and the cyclical nature of life.

1. **Audio‑visual coupling** Using p5.FFT and p5.Amplitude, I capture three sound features in each frame: energy in the middle frequencies, the average pitch (spectral centroid), and sudden volume spikes (peaks). These are mapped to different visual elements:
– NoiseBlobs change size and color with the energy,
– Radiants spin faster and shine brighter as pitch increases,
– Sparks appear more often and leave longer trails when the volume peaks.
This makes the scene move in sync with the music’s rhythm, pitch, and loudness—like life flowing through time.

2. **Peak‑trigger highlights**  Using p5.PeakDetect, loud hits in the 200–2000 Hz range trigger a white flash across the screen. These flashes feel like camera flashes or stage lights, marking important beats that symbolise moments of life or fate.

3. **Multi‑form particles & trails**  Spark particles change form depending on the sound:
– High-pitched sounds create long, fading trails (like shooting stars),
– Low sounds create small, still dust (like particles in the air).
These changes reflect how sound density and motion shift over time, reflecting the flow of time.

4. **Visual & aesthetics**  The design uses soft gold tones layered over a grainy background to create a sense of spatial depth, making the scene feel more grounded and immersive. A custom Play/Pause button complements the overall visual style, contributing to a cohesive and polished aesthetic.

---

## Technical implementation

* **Layered canvases** – `createGraphics()` draws a grainy background texture on a hidden buffer, then blends it over the main canvas.
* **Additive glow** – `drawingContext.globalCompositeOperation = "lighter"` is toggled for deep elements to achieve realistic light bloom.
* **Responsive full‑screen** – `calculateScale()` finds the larger ratio of `windowWidth / 900` or `windowHeight / 900`, applies a uniform `scale()`, and stores `offsetX / offsetY` for centred drawing.
* **Audio pipeline** – `p5.FFT`, `Amplitude`, and `PeakDetect` run each frame; their outputs are linearly mapped to size, hue, rotation, spawn probability, and flash alpha.
* **Tempo‑noise blend** – During quiet passages, motion falls back to smooth `frameCount`‑driven `sin()` and Perlin `noise()` values so that the scene never freezes.
* **Modular classes** – `NoiseBlob`, `Radiant`, `Hole`, and `Spark` each own an `update()` and `show()` method; clear separation makes later extensions trivial.

---

## External references / techniques

| Technique     | Source & link                                                                                            | How it was adapted                                                                                                                          |   |
| ------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | - |
| p5.PeakDetect | [https://p5js.org/reference/p5.sound/p5.PeakDetect/](https://p5js.org/reference/p5.sound/p5.PeakDetect/) | Used to trigger a flash overlay: when a peak is detected `flashAlpha` is set and a white rectangle fades out, creating beat‑synced flashes. |   |
|               |                                                                                                          |                                                                                                                                             |   |
