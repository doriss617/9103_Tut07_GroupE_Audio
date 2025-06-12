# Audio-Responsive Fate Wheel: “Echoes of Time”

A generative **p5.js** artwork that translates sound into motion, inspired by  
Pacita Abad’s *Wheels of Fortune* and the meditative score **Clannad – “Town, Flow of Time, People.”**  
The piece investigates how musical structure—pulse, pitch, energy—can animate visual metaphors of life-cycles, memory, and fate.

---

## 1 Interaction Instructions
| Step | Action |
|------|--------|
| 1 | Open the project folder in **Visual Studio Code** (or any editor). |
| 2 | Right-click **index.html → “Open with Live Server.”** |
| 3 | Wait for the page to load; the canvas scales to the window. |
| 4 | Click **Play / Pause** to start or stop the soundtrack. |
| 5 | Observe how forms breathe, rotate, and shimmer in synchrony with the music. |

No further input is required; the composition evolves autonomously.

---

## 2 Individual Animation Approach

### 2.1 Conceptual Rationale  
I selected an **audio-driven** strategy because the chosen track mirrors Abad’s wheel motif: both explore cyclical destiny and temporal flow.  
The music’s ethereal harp lines and slow tempo suggested a visual language of **smooth rotation, gradual colour shifts, and pulse-triggered flashes**.

### 2.2 Audio → Visual Mapping

| Visual Layer | Audio Feature (p5.js) | Controlled Property | Interpretive Aim |
|--------------|-----------------------|---------------------|------------------|
| Global flash | `PeakDetect` (200–2000 Hz) | Frame-wide alpha | Accentuate decisive “turns of fate.” |
| Noise Blobs  | Mid-band energy & spectral centroid | Radius, hue, brightness | Convey breathing life-force; higher pitch → lighter, brighter. |
| Radiant spokes | Spectral centroid & energy | Angular velocity, spoke length | Wheel accelerates with pitch, expands with power. |
| Spark dust | Overall amplitude | Spawn density, tail length | Represent transient memories; crescendos → star showers. |
| Colour wash | Spectral centroid | Blue→Gold filter opacity | Evoke emotional temperature across the score. |

These mappings differ markedly from other group members, who focus chiefly on **size modulation** or **component reveal**; my version couples *multiple* auditory metrics to *multiple* graphical dimensions, resulting in a richer synaesthetic correspondence.

---

## 3 Inspirational References
| Source | Relevance |
|--------|-----------|
| Yayoi Kusama’s polka-dot environments | Repetition and infinity motifs informed the dotted halo rings. |
| Pacita Abad, *Wheels of Fortune* (1994) | Radial composition and layered chroma guided the spoke system. |
| Audio-reactive nebula tutorial (Coding Train, 2023) | Introduced additive blending for luminous particle tails. |

*Thumbnail imagery and links are embedded in the code comments for citation.*

---

## 4 Technical Implementation Highlights

* **Audio pipeline:** `p5.FFT`, `p5.Amplitude`, and `p5.PeakDetect` extract spectral centroid, mid-band energy, overall level, and transient peaks each frame.  
* **Modular classes:** `NoiseBlob`, `Radiant`, `Spark`, and `FlashLayer` each expose `update()` / `render()` methods, ensuring extensibility.  
* **Responsive layout:** `calculateScale()` plus `windowResized()` enforce a 1 : 1 stage that centres and scales on any device.  
* **Additive compositing:** `globalCompositeOperation = "lighter"` simulates luminous overlays without colour clipping.  
* **Code commentary:** Every non-trivial block includes academic-style documentation; external techniques are acknowledged inline.

---

## 5 External Tools and Borrowed Techniques
| Technique | Origin | Integration Rationale |
|-----------|--------|-----------------------|
| Additive blending | MDN Canvas docs | Required for believable glow of overlapping particles. |
| Particle tail logic | Coding Train “Fireworks” example | Adapted to lengthen with spectral centroid, creating pitch-sensitive trails. |
| Responsive scaling pattern | p5.js `resizeCanvas` reference | Ensures exhibition-ready behaviour across screens. |

Hyperlinks to each source are placed directly in the relevant comment blocks.

---

## 6 Summary
*“Echoes of Time”* fuses **real-time audio analysis** with **procedural graphics** to craft a kinetic meditation on cycles of fortune. By orchestrating energy, pitch, and rhythm into layered visual transformations, the piece aspires to make the **inaudible architecture of music** perceptible and poetically resonant with Abad’s wheel of destiny.

> *“Towns fade, people change, yet the essence of life quietly endures.”*  
> The animation renders this idea visible—ever turning, ever luminous, ever reborn.
