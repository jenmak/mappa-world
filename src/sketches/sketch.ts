export const EARTH_RADIUS = 160;
export const HALF_PI = Math.PI/2;

export const DIMENSIONS_MAP: any = {
  'Life Ladder': {
    MIN: 0,
    MAX: 10
  },
  'Freedom to make life choices': {
    MIN: .2,
    MAX: 1
  },
  'Perceptions of corruption': {
    MIN: 0,
    MAX: 1
  }
};

export default function sketch (p: any) {
  // canvas
  let width: number = 800;
  let height: number = 800;

  // earth
  let earth: any; // image
  let angleX: number = 0;
  let angleY: number = -2.4;
  let angleZ: number = .3;

  // data
  let json: any = {};
  let listOfCountries: Country[] = [];
  let currentYear: number = 2018;

  p.preload = function() {
    json = p.loadJSON('countries.json');
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props: any) {	
    if (props.sizeFactor) {
      listOfCountries.forEach((country: Country) => {
        country.setSizeFactor(props.sizeFactor);
      })
    }
    // if (props.selectedCountry) {
    // }
  };
    
  p.setup = function() {
    // Set up the canvas with the earth
    p.createCanvas(width, height, p.WEBGL);
    earth = p.loadImage('earth.jpg');

    // Create country objects
    json[currentYear].forEach((country: any, i: number) => {
      listOfCountries[i] = new Country(country)
    });
  }

  p.mouseDragged = function() {
    angleY += (p.mouseX - p.pmouseX) * -0.03;
    angleX += (p.mouseY - p.pmouseY) * -0.01;
  }

  p.draw = function() {
    p.background(255);
    p.lights();
    p.translate(0, 0, 0);
    p.rotateX(angleX);
    p.rotateY(angleY);
    p.rotateZ(angleZ);
  
    // earth
    p.push();
    p.texture(earth);
    p.noStroke();
    p.sphere(EARTH_RADIUS);
    p.pop();

    listOfCountries.forEach((country: Country) => {
      country.draw();
    });
  }

  class Country {
    public name: string;
    public lat: number;
    public lon: number;
    public happiness: number;
    public corruption: number;
    public freedom: number;
    public coord: any;
    private rv: number; // red value
    private boxh: number;
  
    // happiness: 2 - 9
    constructor(country: any) {
      this.name = country.Name;
      this.happiness = country['Life Ladder'];
      this.corruption = country['Perceptions of corruption'];
      this.freedom = country['Freedom to make life choices'];
      this.lat = country.Latitude;
      this.lon = country.Longitude;
      this.boxh = 0;
      let radians = this.toRadians(this.lat, this.lon);
      let cart = this.sphereToCart(radians, EARTH_RADIUS);
      this.coord = new p.createVector(cart.x, cart.y, cart.z);
      this.rv = p.map(this.happiness, DIMENSIONS_MAP['Life Ladder'].MIN, DIMENSIONS_MAP['Life Ladder'].MAX, 255, 0);
      this.setSizeFactor('Life Ladder');
    }

    public setSizeFactor(sizeFactor: string) {
      let size = null;
      switch(sizeFactor) {
        case 'Life Ladder':
          size = this.happiness;
          break;
        case 'Perceptions of corruption':
          size = this.corruption;
          break;
        case 'Freedom to make life choices':
          size = this.freedom;
          break;
        default:
          size = this.happiness;
          break;
      }
      this.boxh = p.map(size, DIMENSIONS_MAP[sizeFactor].MIN, DIMENSIONS_MAP[sizeFactor].MAX, 1, 2);
    }
  
    public draw() {
      p.push();
      p.stroke(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
      p.line(this.coord.x, this.coord.y, this.coord.z, this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.translate(this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.noStroke();
      p.fill(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
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
