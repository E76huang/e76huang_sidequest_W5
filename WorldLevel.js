class WorldLevel {
  constructor(json) {
    this.schemaVersion = json.schemaVersion ?? 1;

    this.w = json.world?.w ?? 2400;
    this.h = json.world?.h ?? 1600;
    this.bg = json.world?.bg ?? [235, 235, 235];
    this.gridStep = json.world?.gridStep ?? 160;

    this.obstacles = json.obstacles ?? [];

    // NEW: camera tuning knob from JSON (data-driven)
    this.camLerp = json.camera?.lerp ?? 0.12;

    // Corrected: use json instead of data
    this.camBreathAmp = json.camera?.breathAmp ?? 0;      // breathing amplitude
    this.camBreathSpeed = json.camera?.breathSpeed ?? 0.01; // breathing speed
    this.camNoiseAmp = json.camera?.noiseAmp ?? 0;        // organic drift amplitude
    this.camNoiseSpeed = json.camera?.noiseSpeed ?? 0.002; // drift speed
    this.camDeadZone = json.camera?.deadZone ?? 0;       // soft camera dead zone
  }

  drawBackground() {
    background(220);
  }

  drawWorld() {
    noStroke();
    fill(this.bg[0], this.bg[1], this.bg[2]);
    rect(0, 0, this.w, this.h);

    stroke(245);
    for (let x = 0; x <= this.w; x += this.gridStep) line(x, 0, x, this.h);
    for (let y = 0; y <= this.h; y += this.gridStep) line(0, y, this.w, y);

    noStroke();
    fill(170, 190, 210);
    for (const o of this.obstacles) rect(o.x, o.y, o.w, o.h, o.r ?? 0);

     // --- Floating / scattered shapes ---

  // Light blue ellipse
  fill(173, 216, 230);  
  ellipse(1200, 500, 100, 60);

  // Pink ellipse
  fill(255, 182, 193);
  ellipse(1500, 1200, 80, 50);

  // Light green ellipse
  fill(144, 238, 144);
  ellipse(1800, 300, 70, 70);

  // Light yellow ellipse
  fill(255, 255, 224);
  ellipse(2000, 900, 100, 40);

  // Light purple ellipse
  fill(216, 191, 216);
  ellipse(500, 1300, 60, 60);

  // Light magenta rounded rectangle
  fill(255, 182, 255);
  rect(2200, 1100, 100, 50, 20);

  // Indigo rounded rectangle (soft)
  fill(138, 43, 226, 180); // indigo with alpha for softness
  rect(2100, 700, 120, 60, 25);

  // Light blue rounded rectangle
  fill(173, 216, 230);
  rect(1700, 1500, 90, 40, 15);

  // Optional: gentle floating motion
  const floatAmp = 5;
  const floatSpeed = 0.01;
  ellipse(1200 + sin(frameCount * floatSpeed) * floatAmp, 500 + cos(frameCount * floatSpeed) * floatAmp, 100, 60);
}

  drawHUD(player, camX, camY) {
    noStroke();
    fill(20);
    text("Example 4 — JSON world + smooth camera (lerp).", 12, 20);
    text(
      "camLerp(JSON): " +
        this.camLerp +
        "  Player: " +
        (player.x | 0) +
        "," +
        (player.y | 0) +
        "  Cam: " +
        (camX | 0) +
        "," +
        (camY | 0),
      12,
      40,
    );
  }
}