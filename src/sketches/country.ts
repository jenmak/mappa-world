import { EARTH_RADIUS } from './sketch';
const HALF_PI = Math.PI/2;

export class Country {
  public lat: number;
  public lon: number;
  public mag: number;
  public h: number;
  public coord: {
    x: number;
    y: number;
    z: number;
  };
  private radians: {
    theta: number;
    phi: number;
  };

  constructor(mag: number, lat: number, lon: number) {
    this.mag = mag;
    this.lat = lat;
    this.lon = lon;
    this.radians = this.toRadians(lat, lon);
    this.coord = this.sphereToCart(this.radians, EARTH_RADIUS);
    this.h = Math.pow(10, mag);
  }

  public draw() {
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

export default Country;