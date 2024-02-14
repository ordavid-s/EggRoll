export class ConnectedDevice {
  constructor(ip) {
    this.ip = ip;
    this.url = `http://${ip}:8008/`;
  }
}
