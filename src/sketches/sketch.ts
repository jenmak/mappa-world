import { Country } from "./country";
export const TWO_PI = 2*Math.PI;
export const EARTH_RADIUS = 275;

export default function sketch (p: any) {
    let angleX = 0;
    let angleY = -2.4;
    let angleZ = .3;
    let coord: {
      x: number,
      y: number,
      z: number
    };
    let listOfCountries: Country[] = [];
    let countries = [ // lat, lon
      // [0,0],
      // [10, 0],
      [40.647560, -74.006340], // ny
      [19.075983, 72.877655], // mumbai
      [22.282150, 114.156883], // hong kong
      [14.599512, 120.984222], // manila
      [51.507351, -0.127758] // london
    ]; // 2d array

    let width = 800;
    let height = 800;

    let earth: any; // image
    
    p.setup = function() {
      p.createCanvas(width, height, p.WEBGL);
      coord = p.createVector();
      earth = p.loadImage('earth.jpg');

      // Create the country objects
      for (let i = 0; i < countries.length; i++) {
        listOfCountries[i] = new Country(8, countries[i][0], countries[i][1]);
      }
    }

    p.mouseDragged = function() {
      angleY += (p.mouseX - p.pmouseX) * -0.03;
      angleX += (p.mouseY - p.pmouseY) * -0.01;
    }

    p.mouseClicked = function() {
        // console.log(event);
    }
    
    p.draw = function() {
      p.background(0);
      coord.x = 0;
      coord.y = 0;
      coord.z = 0;
      p.translate(coord);
      p.rotateX(angleX);
      p.rotateY(angleY);
      p.rotateZ(angleZ);

      // earth
      p.texture(earth);
      p.noStroke();
      p.sphere(EARTH_RADIUS);
      
      for (let i=0; i<listOfCountries.length; i++) {
        drawCountry(listOfCountries[i]);
      }
  }

  function drawCountry(country: Country) {
    let maxh: number = p.pow(10, 7);
    let boxh: number = p.map(country.h, 0, maxh, 10, 100);
    let xaxis = new p.createVector(1,0,0);
    let pos = new p.createVector(country.coord.x, country.coord.y, country.coord.z);
    let raxis = xaxis.cross(pos);
    let angleb = pos.angleBetween(xaxis);
  
    p.push();
    p.translate(pos.x, pos.y, pos.z);
    p.rotate(angleb, raxis);
    p.fill(236, 195, 11);
    p.box(boxh, 5, 5);
    p.pop();
  }
}
