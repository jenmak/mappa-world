import { DIMENSION_NAMES, DIMENSIONS_MAP } from '../constants/dimensions';

export const HALF_PI = Math.PI/2;

export default function sketch (p: any) {
  // selected country animation
  let pulse = 0;
  
  // canvas
  let width: number = 900;
  let height: number = 1000;

  // earth
  let EARTH_RADIUS = 250;
  let earth: any; // image
  let angleX: number = 0;
  let angleY: number = -2.4;
  let angleZ: number = .3;

  // data
  let json: any = {};
  let listOfCountries: Country[] = [];
  let currentYear: number = 2018;

  p.preload = function() {
    earth = p.loadImage('world.jpg');
    json = p.loadJSON('countries.json');
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props: any) {
    if (props.sizeFactor) {
      listOfCountries.forEach((country: Country) => {
        country.setSizeFactor(props.sizeFactor);
      })
    }
    if (props.selectedCountry) {
      listOfCountries.forEach((country: Country) => {
        country.setSelected(props.selectedCountry);
      })
    }
    if (props.isMobile) {
      width = 400;
      height = 800;
      EARTH_RADIUS = 100;
    }
  };
    
  p.setup = function() {
    // Set up the canvas with the earth
    p.createCanvas(width, height, p.WEBGL);

    // Create country objects
    json[currentYear].forEach((country: any, i: number) => {
      listOfCountries[i] = new Country(country);
      listOfCountries[i].setSelected('Finland');
    });
  }

  p.mouseDragged = function() {
    angleY += (p.mouseX - p.pmouseX) * 0.03;
    angleX += (p.mouseY - p.pmouseY) * -0.01;
  }

  p.draw = function() {
    p.background(26, 27, 75);
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

    // rotate
    angleY -= .001

    listOfCountries.forEach((country: Country) => {
      country.draw();
    });
  }

  class Country {
    public isSelected: boolean;
    public name: string;
    public lat: number;
    public lon: number;
    public govtConfidence: number;
    public gdp: number;
    public generosity: number;
    public lifeExpectancy: number;
    public happiness: number;
    public corruption: number;
    public freedom: number;
    public support: number;
    public positiveAffect: number;
    public negativeAffect: number;
    public coord: any;
    private rv: number; // red value
    private boxh: number;
  
    // happiness: 2 - 9
    constructor(country: any) {
      this.isSelected = false;
      this.name = country.Name;
      this.govtConfidence = country[DIMENSION_NAMES.GOVT_CONFIDENCE] || 0;
      this.happiness = country[DIMENSION_NAMES.LIFE_LADDER] || 0;
      this.corruption = country[DIMENSION_NAMES.CORRUPTION] || 0;
      this.freedom = country[DIMENSION_NAMES.FREEDOM] || 0;
      this.support = country[DIMENSION_NAMES.SOCIAL_SUPPORT] || 0;
      this.gdp = country[DIMENSION_NAMES.GDP] || 0;
      this.generosity = country[DIMENSION_NAMES.GENEROSITY] || 0;
      this.lifeExpectancy = country[DIMENSION_NAMES.LIFE_EXPECTANCY] || 0;
      this.positiveAffect = country[DIMENSION_NAMES.POSITIVE_AFFECT] || 0;
      this.negativeAffect = country[DIMENSION_NAMES.NEGATIVE_AFFECT] || 0;
      this.lat = country.Latitude;
      this.lon = country.Longitude;
      this.boxh = 0;
      let radians = this.toRadians(this.lat, this.lon);
      let cart = this.sphereToCart(radians, EARTH_RADIUS);
      this.coord = new p.createVector(cart.x, cart.y, cart.z);
      this.rv = p.map(this.happiness, DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MIN, DIMENSIONS_MAP[DIMENSION_NAMES.LIFE_LADDER].MAX, 255, 0);
      this.setSizeFactor(DIMENSION_NAMES.LIFE_LADDER);
    }

    public setSelected(name: string) {
      this.isSelected = !!(name === this.name);
    }

    public setSizeFactor(sizeFactor: string) {
      let size = null;
      switch(sizeFactor) {
        case DIMENSION_NAMES.LIFE_LADDER:
          size = this.happiness;
          break;
        case DIMENSION_NAMES.GOVT_CONFIDENCE:
          size = this.govtConfidence;
          break;
        case DIMENSION_NAMES.CORRUPTION:
          size = this.corruption;
          break;
        case DIMENSION_NAMES.FREEDOM:
          size = this.freedom;
          break;
        case DIMENSION_NAMES.GDP:
          size = this.gdp;
          break;
        case DIMENSION_NAMES.SOCIAL_SUPPORT:
          size = this.support;
          break;
        case DIMENSION_NAMES.GENEROSITY:
          size = this.generosity;
          break;
        case DIMENSION_NAMES.LIFE_EXPECTANCY:
          size = this.lifeExpectancy;
          break;
        case DIMENSION_NAMES.POSITIVE_AFFECT:
          size = this.positiveAffect;
          break;
        case DIMENSION_NAMES.NEGATIVE_AFFECT:
          size = this.negativeAffect;
          break;
        default:
          size = this.happiness;
          break;
      }
      if (size !== 0) {
        this.boxh = p.map(size, DIMENSIONS_MAP[sizeFactor].MIN, DIMENSIONS_MAP[sizeFactor].MAX, 1, 2);
      } else {
        this.boxh = 0;
      }
    }
  
    public draw() {
      p.push();
      p.stroke(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
      p.line(this.coord.x, this.coord.y, this.coord.z, this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.translate(this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.noStroke();
      p.fill(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
      p.sphere(this.boxh*5);

      if (this.isSelected) {
        this.drawSelected();
      }
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

    private drawSelected(): void {
      let xaxis = p.createVector(1,0,0);
      let raxis = xaxis.cross(this.coord);
      let angleb = this.coord.angleBetween(xaxis);
      p.rotate(angleb, raxis);	
      p.fill(247, 164, 0); // yellow
      p.torus(5 + pulse, 2);
      p.torus(15 + pulse, 2);
      p.torus(25 + pulse,2);
      if(pulse < 10) {
        pulse = pulse + .15;
      } else {
        pulse = 0;
      }
    }
  }
}
