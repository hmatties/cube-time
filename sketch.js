function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  background(100, 100, 100);
  drawCube();
}

const count = 20;

function drawCube() {
  for (let i = 0; i < count; i++) {
    //generates random origin point for each vector
    const ox = random(windowWidth * 0.35, windowWidth * 0.65);
    const oy = random(windowHeight * 0.25, windowHeight * 0.75);
    translate(ox, oy);

    //generates a length for each dimension
    const lx = Math.floor(Math.random() * ((count - i) / count) * 200) + 25;
    const ly = Math.floor(Math.random() * ((count - i) / count) * 200) + 25;
    const lz = Math.floor(Math.random() * ((count - i) / count) * 20) + 25;

    //calls the points and faces function
    const points = cubePoints(lx, ly, lz);
    const faces = cubeFaces(points);
    const lines = cubeLines(points);
    const shades = shadeInc(i);

    console.log(shades);

    //removes quad stroke
    strokeWeight(0);

    //generates unique color scheme for each cube

    //builds the quads
    for (let j = 0; j < 3; j++) {
      const f = faces[j];
      const s = shades[j];
      fill(s[0], s[1], s[2]);
      quad(...f.flatMap((v) => [v.x, v.y]));
    }

    //creates line stroke
    strokeWeight(2);

    //build the strokes
    for (const l of lines) {
      line(...l.flatMap((v) => [v.x, v.y]));
    }

    translate(-ox, -oy);
  }
}

function cubePoints(lx, ly, lz) {
  //original vectors
  const vx = createVector(cos(-PI / 6), sin(-PI / 6)).mult(lx);
  const vy = createVector(cos((-5 * PI) / 6), sin((-5 * PI) / 6)).mult(ly);
  const vz = createVector(cos((-3 * PI) / 2), sin((-3 * PI) / 2)).mult(lz);

  //target points
  const vxy = vx.copy().add(vy);
  const vyz = vy.copy().add(vz);
  const vxz = vx.copy().add(vz);

  const points = [vx, vxy, vy, vyz, vz, vxz];

  return points;
}

function cubeFaces(points) {
  const [vx, vxy, vy, vyz, vz, vxz] = points;

  const f1 = [createVector(0, 0), vy, vxy, vx];
  const f2 = [createVector(0, 0), vx, vxz, vz];
  const f3 = [createVector(0, 0), vz, vyz, vy];

  return [f1, f2, f3];
}

function cubeLines(points) {
  const [vx, vxy, vy, vyz, vz, vxz] = points;

  const lines = [];
  lines.push([createVector(0, 0), vx]);
  lines.push([createVector(0, 0), vy]);
  lines.push([createVector(0, 0), vz]);
  lines.push([vy, vxy]);
  lines.push([vxy, vx]);
  lines.push([vy, vyz]);
  lines.push([vz, vyz]);
  lines.push([vx, vxz]);
  lines.push([vz, vxz]);

  return lines;
}

function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function keyPressed() {
  if (keyCode === ENTER) {
    saveFrames("cubes", "png", 1, 1);
  }
}

function shadeInc(i) {
  let h = i;
  let s = 64;
  let l = 20;

  const s1 = [h, s, l + 60];
  const s2 = [h, s, l + 20];
  const s3 = [h, s, l + 40];

  return [s1, s2, s3];
}
