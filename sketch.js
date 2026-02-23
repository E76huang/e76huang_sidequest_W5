/*
Week 5 — Example 4: Data-driven world with JSON + Smooth Camera

Course: GBDA302 | Instructors: Dr. Karen Cochrane & David Han
Date: Feb. 12, 2026

Move: WASD/Arrows

Learning goals:
- Extend the JSON-driven world to include camera parameters
- Implement smooth camera follow using interpolation (lerp)
- Separate camera behavior from player/world logic
- Tune motion and feel using external data instead of hard-coded values
- Maintain player visibility with soft camera clamping
- Explore how small math changes affect “game feel”
*/

const VIEW_W = 800;
const VIEW_H = 480;

let worldData;
let level;
let player;

let camX = 0;
let camY = 0;

function preload() {
  worldData = loadJSON("world.json"); // load JSON before setup [web:122]
}

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  textFont("sans-serif");
  textSize(14);

  level = new WorldLevel(worldData);

  const start = worldData.playerStart ?? { x: 300, y: 300, speed: 0.001 };
  player = new Player(start.x, start.y, start.speed);

  camX = player.x - width / 2;
  camY = player.y - height / 2;
}

function draw() {
  player.updateInput();

  // Keep player inside world
  player.x = constrain(player.x, 0, level.w);
  player.y = constrain(player.y, 0, level.h);

  // Target camera (center on player)
let targetX = player.x - width / 2;
let targetY = player.y - height / 2 + 80;


// --- Clamp camera inside world ---
const maxCamX = max(0, level.w - width);
const maxCamY = max(0, level.h - height);
targetX = constrain(targetX, 0, maxCamX);
targetY = constrain(targetY, 0, maxCamY);

// --- Smooth follow using lerp ---
camX = lerp(camX, targetX, level.camLerp);
camY = lerp(camY, targetY, level.camLerp);

// --- BREATHING effect ---
const breathX = sin(frameCount * level.camBreathSpeed);
const breathY = cos(frameCount * level.camBreathSpeed);

const noiseOffset = frameCount * level.camNoiseSpeed;
const noiseX = (noise(noiseOffset) - 0.5) * level.camNoiseAmp;
const noiseY = (noise(noiseOffset + 1000) - 0.5) * level.camNoiseAmp;

// --- Apply meditative offsets ---
camX += breathX + noiseX;
camY += breathY + noiseY;

  level.drawBackground();

  push();
  translate(-camX, -camY);
  level.drawWorld();
  player.draw();
  pop();

  level.drawHUD(player, camX, camY);
}

function keyPressed() {
  if (key === "r" || key === "R") {
    const start = worldData.playerStart ?? { x: 300, y: 300, speed: 0.001};
    player = new Player(start.x, start.y, start.speed);
  }
}
