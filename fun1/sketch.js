//set each radius of the circle to 100, each grid have a transformation instance
let cxL, cyL; //center of the thing
let cxR, cyR; // center of ran
const rad = 120;
const NVT = 3; //number of vertices of triangle
let circlePoints = 210;
let triV = [];
let circleVL = [];
let triVL = [];
let delta;
let step = 0.00001;
let n = 20; //number of blobs
let r = 100;
let vnumber = 0;
let maxRange = 120;
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, 400);
  delta = random(20);
  background(0);
  cxL = width / 4;
  cyL = height / 2;
  for (let i = 0; i < 3; i++) {
    triV[i] = createVector(
      cxL + rad * cos(i * 120 + 270),
      cyL + rad * sin(i * 120 + 270)
    );
  }
  // test1
  // strokeWeight(4);
  // stroke(255, 0, 0);
  // for (let j = 0; j < 3; j++) {
  //   point(triV[j].x, triV[j].y);
  // }
  for (let u = 0; u < circlePoints; u++) {
    let angleStep = 360 / circlePoints;
    circleVL[u] = createVector(
      cxL + rad * cos(angleStep * u),
      cyL + rad * sin(angleStep * u)
    );
  }
  /*------------------------------------------------------------might not be trash save it for later-------------------------------------------*/
  //test 2
  // stroke(255);
  //  for (let j = 0; j < circlePoints; j++){
  //   point(circleVL[j].x, circleVL[j].y);
  // }
  //need to set the same number of points along the triangle for lerp
  //I could use loop to make it look simpler, but don't want to
  // let slope1 = slopeGetter(0, triV);
  // let slope2 = slopeGetter(1, triV);
  // let slope3 = slopeGetter(2, triV);
  // let int1 = triV[0].y - slope1 * triV[0].x;
  // let int2 = triV[1].y - slope2 * triV[1].x;
  // let int3 = triV[2].y - slope3 * triV[2].x
  //test 3
  // console.log(triV[0], triV[1], triV[2]);
  // console.log(slope1, slope2, slope3);
  //need to set the same number of points along the triangle for lerp
  // for(let first = 0; first < 70; first++){
  //   triVL[first] = createVector(triV[0].x - ((triV[0].x - triV[2].x)/70) * first , slope3 * (triV[0].x - ((triV[0].x - triV[2].x)/70)) * first + int3);
  // }
  // // this is right
  //   for(let sec = 70; sec < 140; sec ++){
  //   triVL[sec] = createVector(triV[1].x -((triV[1].x - triV[2].x)/70) * (sec-70), slope2 * (triV[1].x - (triV[1].x - triV[2].x)/70) * (sec -70) + int2);
  // }
  //   for(let thr = 140; thr< 210; thr++){
  //   triVL[thr] = createVector(triV[1].x -((triV[1].x - triV[0].x)/70) * (thr- 140), slope1 * (triV[1].x - (triV[1].x - triV[0].x)/70) * (thr - 140) + int1);
  // }
  //The essense of this problem is to find the shortest path from a dot to a line
  //I could not figure out a viable way of solving this, thanks to golanlevin and Paul Bourke
  // for (let o = 0; o < circlePoints; o++) {
  //   let vArrayLoc = floor((((circlePoints + o) / (circlePoints / 3)) + 1) % 3);
  //   console.log(vArrayLoc);
  //   let firstPoint = {
  //     x: triV[vArrayLoc].x,
  //     y: triV[vArrayLoc].y,
  //   };
  //   let secondPoint = {
  //     x: triV[(vArrayLoc + 1) % 3].x,
  //     y: triV[(vArrayLoc + 1) % 3].y,
  //   };
  //   let firstEdge =
  //     (circleVL[o].x - cxL) * (firstPoint.y - cyL) -
  //     (circleVL[o].y - cyL) * (firstPoint.x - cxL);
  //   let secondEdge =
  //     (secondPoint.x - firstPoint.x) * (firstPoint.y - cyL) -
  //     (secondPoint.y - firstPoint.y) * (firstPoint.x - cxL);
  //   let thirdEdge =
  //     (circleVL[o].y - cyL) * (secondPoint.x - firstPoint.x) -
  //     (circleVL[o] - cxL) * (secondPoint.y - firstPoint.y);
  //   let firstS = firstEdge / thirdEdge;
  //   let secondS = secondEdge / thirdEdge;
  //   let realSlope = 1;
  //   if (firstS >= 0 && firstS <= 1) {
  //     realSlope = firstS;
  //   } else if (secondS >= 0 && secondS <= 1) {
  //     realSlope = secondS;
  //   }
  //   triVL[o] = createVector(
  //     firstPoint.x + realSlope * (firstPoint.x - secondPoint.x),
  //     firstPoint.y + realSlope * (secondPoint.y - firstPoint.y)
  //   );
  // }
  //test4
  // strokeWeight(1);
  // stroke(255);
  // for(tester = 0; tester < 210; tester++){
  //   point(triVL[tester].x, triVL[tester].y);
  // }
  /*------------------------------------------------------------might not be trash save it for later-------------------------------------------*/
  for (var j = 0; j < circlePoints; j++) {
    var i = (floor((j + circlePoints) / (circlePoints / 3)) + 1) % 3;
    var lp1x = triV[i].x;
    var lp1y = triV[i].y;
    var lp2x = triV[(i + 1) % 3].x;
    var lp2y = triV[(i + 1) % 3].y;
    var li1x = cxL;
    var li1y = cyL;
    var li2x = circleVL[j].x;
    var li2y = circleVL[j].y;
    var pxi1 = (li2x - li1x) * (lp1y - li1y) - (li2y - li1y) * (lp1x - li1x);
    var pxi2 = (lp2x - lp1x) * (lp1y - li1y) - (lp2y - lp1y) * (lp1x - li1x);
    var pxi3 = (li2y - li1y) * (lp2x - lp1x) - (li2x - li1x) * (lp2y - lp1y);
    var slope1 = pxi1 / pxi3;
    var slope2 = pxi2 / pxi3;
    var realSlope = 1.0;
    if (slope1 >= 0 && slope1 <= 1) {
      realSlope = slope1;
    } else if (slope2 >= 0 && slope2 <= 1) {
      realSlope = slope2;
    }
    triVL[j] = createVector(lp1x + realSlope * (lp2x - lp1x), lp1y + realSlope * (lp2y - lp1y));
  }
}
function draw() {
  background(0, 10);
  vnumber = 3;
  let t1 = millis() / 1000;
  let t2 = millis() % 2000;
  noStroke();
  beginShape();
  fill(255, 100);

  for (let i = 0; i < circlePoints; i++) {
    vertex(
      map(t2, 0, 2000, circleVL[i].x, triVL[i].x),
      map(t2, 0, 2000, circleVL[i].y, triVL[i].y)
    );
  }
  endShape();
  for (let i = 0; i < n; i++) {
    let noisiness = maxRange * (i / n);
    fill(255, 255, 250, 15);
    blob(
      r,
      (width * 3) / 4,
      height / 2,
      delta,
      t1 - i * step,
      noisiness,
      vnumber
    );
  }
}
//some useful stuff
function slopeGetter(a, array_v) {
  //this part calc slope, para takes index in the array
  if (a == NVT - 1) {
    return (array_v[a].y - array_v[0].y) / (array_v[a].x - array_v[0].x);
  } else {
    return (
      (array_v[a + 1].y - array_v[a].y) / (array_v[a + 1].x - array_v[a].x)
    );
  }
}
//so here by processing the inerception, we can move the function around
//I dont need this stuff
function interceptGetter(a, array_v) {
  return array_v[a].y - slopeGetter(a) * array_v[a].x;
}

function blob(size, xC, yC, k, t, range, vn) {
  beginShape();
  let angleStep = 360 / vn;
  for (let angle = 0; angle <= 360 + 2 * angleStep; angle += angleStep) {
    let r =
      size +
      noise(k * abs(cos(angle + 270)), k * abs(sin(angle + 270)), t) * range;
    curveVertex(xC + r * cos(angle + 270), yC + r * sin(angle + 270));
  }
  endShape();
}
/*
reference for the interpolation alogrithm:
http://paulbourke.net/geometry/pointlineplane/
https://github.com/golanlevin/circle-morphing/
*/
