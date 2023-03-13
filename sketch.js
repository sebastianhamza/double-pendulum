let r1 = 125;
let r2 = 125;
let m1 = 20;
let m2 = 20;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;
let ok = 0;

let px2 = -1;
let py2 = -1;
let cx, cy;


let buffer;

console.log('Made by Sebastian Hamza');


function setup() {
  createCanvas(500, 500);
  a1 = PI / 2;
  a2 = PI / 2;
  cx = width / 2;
  cy = 150;
  buffer = createGraphics(width, height);
  buffer.background(114, 125, 142);
  buffer.translate(cx, cy);

  r1Slider = createSlider(1, 200, 100);
  r1Slider.position(10, 430);

  r2Slider = createSlider(1, 200, 100);
  r2Slider.position(10, 460);

  m1Slider = createSlider(1, 50, 15);
  m1Slider.position(350, 430);

  m2Slider = createSlider(1, 50, 15);
  m2Slider.position(350, 460);

  checkbox = createCheckbox('Air Friction', false);
  checkbox.changed(myCheckedEvent);

}


function myCheckedEvent() {
  if (this.checked()) {
     ok=1;
  } else {
     ok=0;
  }
}



function draw() {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  r1 = r1Slider.value();
  text('Lenght 1', 140, 440);

  r2 = r2Slider.value();
  text('Lenght 2', 140, 470);

  m1 = m1Slider.value();
  text('Mass 1', 290, 440);

  m2 = m2Slider.value();
  text('Mass 2', 290, 470);


  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;


  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, m2, m2);


  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

//text(a2_v, -240, 340);
  

if(ok){
   a1_v *= 0.999;
   a2_v *= 0.999;
} //Toogles the air friction.


  buffer.stroke(0);
  buffer.stroke(11, 32, 63);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }


  px2 = x2;
  py2 = y2;

 

}


