declare global {
  interface String {
    asCelciusDegree(): string;
    to24h(): string;
  }
}
String.prototype.asCelciusDegree = function () {
  return String(this) + ' °C';
};

String.prototype.to24h = function () {
  const withoutAmPm = String(this).split(' ')[0];
  if (String(this).includes('PM')) {
    const hours = withoutAmPm.split(':')[0];
    const minutes = withoutAmPm.split(':')[1];
    let newHours = parseInt(hours) + 12;
    newHours = newHours >= 24 ? 0 : newHours;
    return newHours.toString() + ':' + minutes;
  } else {
    return withoutAmPm;
  }
};

export {};
