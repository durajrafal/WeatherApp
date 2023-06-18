declare global {
  interface String {
    asCelciusDegree(): string;
  }
}
String.prototype.asCelciusDegree = function () {
  return String(this) + ' °C';
};

export {};
