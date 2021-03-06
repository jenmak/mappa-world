export default function sketch (p: any) {

  // canvas
  let width: number = 375;
  let height: number = 120;

  let sizeFactor: string = '';

  p.setup = function() {
    p.createCanvas(width, height);
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props: any) {
    if (props.sizeFactor) {
      sizeFactor = props.sizeFactor;
    }
  }
  p.draw = function() {
    p.push();
    p.noStroke();
    p.fill(26, 27, 75);
    p.rect(0, 0, 120, 100);
    for(let i = 0; i < 10; i++) {
      let rv = p.map(i, 0, 10, 255, 0);
      p.fill(rv, 188, 255); // 151, blue to 222, pink
      p.rect(100 + i*20, 20, 20, 20);
    }
    p.fill(255);
    p.textSize(12);
    p.text('Happiness', 20, 35);
    p.text(sizeFactor, 20, 55, 100);
    p.textSize(10);
    p.text('less', 100, 10);
    p.text('more', 280, 10)
    p.pop();


    p.push();
    p.stroke(0, 188, 255);
    p.fill(0,188,255);
    p.line(100, 60, 200, 60);
    p.noStroke();
    p.circle(200, 60, 25);
    p.pop();
  }
}
