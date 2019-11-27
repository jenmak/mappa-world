export const EARTH_RADIUS = 275;
export const HALF_PI = Math.PI/2;

export default function sketch (p: any) {
    let angleX = 0;
    let angleY = -2.4;
    let angleZ = .3;
    let coord: {
      x: number,
      y: number,
      z: number
    };
    let json: any;
    let listOfCountries: Country[] = [];

    let width = 800;
    let height = 800;
    let currentYear = 2018;

    let earth: any; // image

    p.preload = function() {
      json = p.loadJSON('countries.json');
    }

    // p.myCustomRedrawAccordingToNewPropsHandler = function (props: any) {	
      // console.log(props);
    // };
    
    p.setup = function() {
      // Create the country objects
      json[currentYear].forEach((country: any, i: number) => {
        listOfCountries[i] = new Country(country.name, country['Life Ladder'], country.Latitude, country.Longitude)
      });

      // Set up the canvas with the earth
      p.createCanvas(width, height, p.WEBGL);
      coord = p.createVector();
      earth = p.loadImage('earth.jpg');
    }

    p.mouseDragged = function() {
      angleY += (p.mouseX - p.pmouseX) * -0.03;
      angleX += (p.mouseY - p.pmouseY) * -0.01;
    }

    p.draw = function() {
      p.background(0);
      coord.x = 0;
      coord.y = 0;
      coord.z = 0;
      p.lights();
      p.translate(coord);
      p.rotateX(angleX);
      p.rotateY(angleY);
      p.rotateZ(angleZ);
    
      // earth
      p.push();
      p.texture(earth);
      p.noStroke();
      p.sphere(EARTH_RADIUS);
      p.pop();

      for (let i=0; i<listOfCountries.length; i++) {
        listOfCountries[i].draw();
      }
  }

  class Country {
    public name: string;
    public lat: number;
    public lon: number;
    public happiness: number;
    public coord: any;
    private rv: number; // red value
    private boxh: number;
    private radians: {
      theta: number;
      phi: number;
    };
  
    // happiness: 2 - 9
    constructor(name: string, happiness: number, lat: number, lon: number) {
      this.name = name;
      this.happiness = happiness;
      this.lat = lat;
      this.lon = lon;
      this.radians = this.toRadians(lat, lon);
      let cart = this.sphereToCart(this.radians, EARTH_RADIUS);
      this.coord = new p.createVector(cart.x, cart.y, cart.z);
      // this.boxh = p.map(this.h, 0, p.pow(10,10), 0, 10);
      this.boxh = 1.1;
      this.rv = p.map(this.happiness, 2, 9, 255, 0);
      console.log(this.rv);
    }
  
    public draw() {
      p.push();
      p.stroke(Math.floor(this.rv), 188, 255,10); // 151, blue to 222, pink
      p.line(this.coord.x, this.coord.y, this.coord.z, this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.translate(this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.sphere(this.boxh*5);
      p.pop();
    }
  
    public degreesToRadians(deg: number) {
      return deg/180 * Math.PI;
    }
    
    public toRadians(lat: number, lon: number) {
      return {
        theta: this.degreesToRadians(lat),
        phi: this.degreesToRadians(lon) + HALF_PI
      };
    };
    
    public sphereToCart(rad: { theta: number, phi: number }, r: number) {
      return {
        x: r * Math.cos(rad.theta) * Math.cos(rad.phi),
        y: -1 * r * Math.sin(rad.theta),
        z: -1 * r  * Math.cos(rad.theta) * Math.sin(rad.phi)
      }
    }
  }
}
