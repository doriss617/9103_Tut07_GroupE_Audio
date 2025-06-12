# Audio-Driven Kinetic Composition  
**Individual Extension of Group Baseline**

## 1 Project Context
This repository contains two *p5.js* sketches:

| File | Purpose |
|------|---------|
| **`sketch (1).js`** | Group baseline—static, non-interactive visual. |
| **`sketch.js`** | Individual extension—adds real-time audio analysis, multilayer animation, and responsive layout. |

The extension explores how auditory data can govern procedural imagery, thereby translating musical structure into visual motion.

---

## 2 Interaction Guide
1. Open a local server (e.g., `python -m http.server 8000`) in the project root.  
2. Navigate to `http://localhost:8000` in any modern browser.  
3. Click **Play/Pause** to start or stop the soundtrack.  
4. Resize the browser window— the canvas rescales automatically while preserving a 1 : 1 aspect ratio.

---

## 3 Individual Animation Concept

### 3.1 Motivation
As a lifelong music enthusiast, I wished to let sound “paint” the canvas.  The chosen track, **Clannad – “Town, Flow of Time, People”**, aligns conceptually with the artwork *Wheels of Fortune*: both contemplate cyclical fate, temporal flux, and the quiet persistence of life.  By coupling spectral data to geometry, colour, and luminosity, the composition visualises these ideas in motion.

### 3.2 Music–Artwork Resonance  
*Town, Flow of Time, People* bears a slow, contemplative tempo.  Ethereal harp, flowing woodwinds, and ambient pads evoke gentle inevitability—the very sentiment embedded in *Wheels of Fortune*.  My animation echoes this by:

* **Smooth, unhurried global rotation** → passage of time.  
* **Subtle hue shifts** → changing yet recurring destinies.  
* **Pulse-driven flashes** → pivotal moments on fortune’s wheel.

---

## 4 Animated Properties and Differentiation

| Visual Layer | Audio Feature | Parameter(s) Controlled | Distinction from Other Members |
|--------------|---------------|-------------------------|--------------------------------|
| **Global Flash** | Peak detection (200–2000 Hz) | Alpha → 0 – 100 | Only my version uses frame-wide white flashes to mark drum hits. |
| **Noise Blobs** | Mid-band energy & spectral centroid | Radius, hue, brightness | Others adjust blob size only; I couple both size and colour to pitch. |
| **Radiant Spokes** | Spectral centroid & mid-band energy | Angular velocity, spoke length | My spokes accelerate with higher pitch, whereas peers alter colour. |
| **Spark Particles** | Amplitude & centroid | Spawn probability, tail length | Peers use static particles; mine grow dense and leave trails in climaxes. |
| **Colour Wash** | Spectral centroid | Blue → gold filter opacity | Unique global tint responsive to melodic register. |

---

## 5 Inspirational References  
| Reference | Type | Influence |
|-----------|------|-----------|
| ![Generative wheel](docs/reference-wheel.gif) | GIF | Suggested radial spoke metaphor for destiny. |
| ![Harp shimmer](docs/reference-harp.jpg) | Still | Guided choice of soft gold-pink palette. |
| ![Audio-reactive nebula](docs/reference-nebula.gif) | GIF tutorial | Introduced additive blending for spark trails. |

---

## 6 Implementation Overview

```text
preload()       → loadSound()
setup()         → createCanvas • init FFT, Amplitude, PeakDetect
draw()          → analyseAudio()
                   ├─ updateNoiseBlobs()  (size & hue ↔ energy/centroid)
                   ├─ updateRadiants()    (rotation & length)
                   ├─ updateSparks()      (density & tails)
                   ├─ renderFlash()       (alpha decay)
windowResized() → recalculate scale & offset
