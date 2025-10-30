const socket = io();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let balloonY = 300;
let velocity = 0;
let beta = 0;

socket.on("tilt", (data) => {
  beta = data.beta;
});

function update() {
  // 傾きによって上昇・下降速度を制御
  velocity += -beta / 200; // 上に傾けるほど上昇
  velocity *= 0.9; // 減速（慣性）

  balloonY += velocity;
  if (balloonY < 50) balloonY = 50;
  if (balloonY > 550) balloonY = 550;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 風船のひも
  ctx.beginPath();
  ctx.moveTo(200, balloonY + 40);
  ctx.lineTo(200, balloonY + 100);
  ctx.stroke();

  // 風船本体
  ctx.beginPath();
  ctx.arc(200, balloonY, 40, 0, Math.PI * 2);
  ctx.fillStyle = "pink";
  ctx.fill();
  ctx.stroke();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
