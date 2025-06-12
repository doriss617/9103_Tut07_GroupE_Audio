
let blobs = [];
let radiants = [];
let holes = [];
let sparks = [];
let bgTexture;

let song, fft, amp, peak;
let flashAlpha = 0;

function preload() {
  song = loadSound('assets/music3.mp3');
}

function setup() {
  createCanvas(900, 900);
  noStroke();

  // background
  bgTexture = createGraphics(width, height);
  createTexture(bgTexture);

  // sound analysis
  fft = new p5.FFT(0.3, 1024);
  amp = new p5.Amplitude();
  fft.setInput(song);
  amp.setInput(song);

  // peak detection
  peak = new p5.PeakDetect(200, 2000, 0.3, 20);

  // play button
  let btn = createButton('Play/Pause');
  btn.position(10, 10);
  btn.mousePressed(() => song.isPlaying() ? song.stop() : song.loop());

  // objects initialization
  for (let i = 0; i < 30; i++) blobs.push(new NoiseBlob());
  for (let i = 0; i < 25; i++) radiants.push(new Radiant());
  for (let i = 0; i < 20; i++) holes.push(new Hole());
  for (let i = 0; i < 50; i++) sparks.push(new Spark()); 
}

function draw() {
  // analyse sound
  fft.analyze();
  peak.update(fft);
  let midEnergy = fft.getEnergy(200, 2000);
  let centroid  = fft.getCentroid();
  let volLevel  = amp.getLevel() * 255;

  // light reflecting drum effect
  if (peak.isDetected) flashAlpha = 100;
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    rect(0, 0, width, height);
    flashAlpha -= 5;
  }

  // background and overlay
  image(bgTexture, 0, 0);
  let t = constrain(centroid / 22050, 0, 1);
  let br = map(t, 0, 1, 0, 200);
  fill(0, 0, br, 60);  
  rect(0, 0, width, height);

  // graphics blending
  for (let h of holes) h.show();
  for (let b of blobs)    { b.update(midEnergy, centroid); b.show(); }
  for (let r of radiants) { r.update(midEnergy, centroid); r.show(); }
  for (let s of sparks)   { s.update(); s.show(volLevel, centroid); }
}

// bg texture
function createTexture(g) {
  g.background(0);
  g.noStroke();
  for (let i = 0; i < 10000; i++) {
    let x = random(width), y = random(height);
    let s = random(0.5, 2), a = random(5, 15);
    g.fill(30, 20, 40, a);
    g.ellipse(x, y, s);
  }
  g.stroke(40, 30, 50, 10);
  for (let i = 0; i < 50; i++) {
    let x1 = random(width), y1 = random(height);
    let x2 = x1 + random(-100, 100), y2 = y1 + random(-100, 100);
    g.line(x1, y1, x2, y2);
  }
}

// NoiseBlob 
class NoiseBlob {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.rBase = random(20, 120);
    this.alpha = random(30, 120);
    this.phase = random(TWO_PI);
    this.speed = random(0.003, 0.01);
    this.baseColor = color(
      255 + random(-30, 0),
      180 + random(-30, 30),
      120 + random(-50, 50),
      this.alpha
    );
    this.c = this.baseColor;
    this.depth = random(1);
    this.noiseScale = random(0.005, 0.02);
    this.r = this.rBase;
  }

  update(midEnergy, centroid) {
    this.phase += this.speed;
    let baseR = this.rBase + sin(this.phase) * (10 * this.depth);  // Reduce the magnitude of changes
    let mf = map(midEnergy, 0, 255, 0.8, 1.2);                       // minor reflection
    this.r = baseR * mf;

    // 色彩与亮度随谱质心变化
    let w = map(centroid, 0, 22050, 0, 1);
    let highlight = color(255, 255, 200, this.alpha);
    this.c = lerpColor(this.baseColor, highlight, w);
    this.c.setAlpha(map(midEnergy, 0, 255, this.alpha * 0.3, this.alpha));

    this.x += map(noise(frameCount * this.noiseScale, 0), -1, 1, -0.5, 0.5);
    this.y += map(noise(0, frameCount * this.noiseScale), -1, 1, -0.5, 0.5);
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;
  }

  show() {
    push();
    translate(this.x, this.y);
    if (this.depth > 0.7) drawingContext.globalCompositeOperation = 'lighter';

    noStroke();
    fill(this.c);
    ellipse(0, 0, this.r);
    let glowSize = this.r * 1.8;
    for (let i = 0; i < 4; i++) {
      fill(red(this.c), green(this.c), blue(this.c), this.c._getAlpha() / (i + 1));
      ellipse(0, 0, glowSize * (0.6 + i * 0.4));
    }

    drawingContext.globalCompositeOperation = 'source-over';
    pop();
  }
}

// Radiant 类
class Radiant {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(20, 60);
    this.n = int(random(30, 120));
    this.alpha = random(30, 100);  
    this.angle = random(TWO_PI);
    this.rotSpeed = random(0.001, 0.03);
    this.lineLength = random(20, 60);
    this.depth = random(1);
    this.pulseSpeed = random(0.02, 0.05);
    this.pulsePhase = random(TWO_PI);
    this.currentLength = this.lineLength;
    this.centerSize = this.r * 0.6;
  }

  update(midEnergy, centroid) {
    let spf = map(centroid, 0, 22050, 0.1, 4);  // increase spinning
    this.angle += this.rotSpeed * spf;

    this.pulsePhase += this.pulseSpeed;
    let lf = map(midEnergy, 0, 255, 0.7, 1.3);
    this.currentLength = this.lineLength * (0.7 + sin(this.pulsePhase) * 0.3) * lf;
    this.centerSize   = this.r * map(midEnergy, 0, 255, 0.3, 2);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    let sa = this.alpha * map(this.depth, 0, 1, 0.4, 0.8); 
    for (let i = 0; i < this.n; i++) {
      let a  = TWO_PI * i / this.n;
      let x1 = cos(a) * this.r, y1 = sin(a) * this.r;
      let jitter = random(0.7, 1.3);
      let x2 = cos(a) * (this.r + this.currentLength * jitter);
      let y2 = sin(a) * (this.r + this.currentLength * jitter);
      stroke(255, 240, 180, sa);
      strokeWeight(map(this.depth, 0, 1, 0.5, 1.5));
      line(x1, y1, x2, y2);
    }
    noStroke();
    fill(255, 240, 180, sa * 0.5);
    ellipse(0, 0, this.centerSize);
    pop();
  }
}

// Hole
class Hole {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(5, 12);
    this.depth = random(1);
    this.innerR = this.r * random(0.3, 0.7);
    this.innerColor = color(
      20 + random(-10, 10),
      10 + random(-5, 5),
      30 + random(-10, 10)
    );
  }

  show() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(0);
    ellipse(0, 0, this.r * 2);
    fill(this.innerColor);
    ellipse(0, 0, this.innerR * 2);
    fill(60, 50, 80, 100);
    ellipse(this.r * 0.2, -this.r * 0.2, this.r * 0.3);
    pop();
  }
}

// Spark 
class Spark {
  constructor() {
    this.reset();
    this.life = random(80, 400);
    this.age = random(this.life);
    this.type = random() > 0.7 ? "line" : "dot";
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1.5, 1.5);
    this.vy = random(-1.5, 1.5);
    this.size = random(1, 4);
    this.baseAlpha = random(100, 255);
    this.colorVariation = random(100);
    this.life = random(80, 400);
    this.age = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.age++;
    if (this.age > this.life || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }

  show(volLevel, centroid) {
    let vNorm = constrain(volLevel / 255 + 0.3, 0, 1); 
    if (random() > vNorm) return;

    let s = this.size * map(volLevel, 0, 255, 0.5, 6);
    s *= map(centroid, 0, 22050, 0.8, 1.2);     
    let a = this.baseAlpha * map(volLevel, 0, 255, 0.5, 1);

    if (this.type === "line") {
      let ang = noise(this.x * 0.01, this.y * 0.01) * TWO_PI;
      stroke(255 - this.colorVariation, 200, 150, a);
      strokeWeight(s * 1.2);
      line(
        this.x, this.y,
        this.x + cos(ang) * s * 4,
        this.y + sin(ang) * s * 4
      );

    } else {
      noStroke();
      fill(255, a);
      ellipse(this.x, this.y, s);
      fill(255, a * 0.2);
      ellipse(this.x, this.y, s * 4);

      if (centroid > 2000) {
        for (let i = 1; i < 6; i++) {
          let tx = this.x - this.vx * i * 4;
          let ty = this.y - this.vy * i * 4;
          let ts = s * (1 - i * 0.12);
          fill(255, a * (1 - i * 0.2));
          ellipse(tx, ty, ts);
        }
      }
    }
  }
}
