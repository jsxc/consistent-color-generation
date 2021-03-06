var sha1 = require('js-sha1')
var hsluv = require('hsluv')

const REDGREEN = 'redgreen';
const BLUE = 'blue';

function RGB(r, g, b) {
   this.r = r;
   this.g = g;
   this.b = b;
}

RGB.prototype.toString = function (format) {
   let r = Math.round(this.r * 255);
   let g = Math.round(this.g * 255);
   let b = Math.round(this.b * 255);

   if (format === 'hex') {
      return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
   }

   return `rgb(${r}, ${g}, ${b})`;
}

function generateAngle(identifier, correction) {
   let hash = sha1(identifier);
   let first16bits = hash.slice(0, 4);
   let littleEndian = first16bits.slice(2) + first16bits.slice(0, 2);
   let angle = parseInt(littleEndian, 16) / 65536 * 360;

   switch (correction) {
      case REDGREEN:
         angle = (((angle + 90) % 180) - 90) % 360;
         break;
      case BLUE:
         angle = angle % 180;
         break;
   }

   return angle;
}

function getRGB(identifier, correction, saturation = 100, lightness = 50) {
   let angle = generateAngle(identifier, correction);
   let rgb = hsluv.hsluvToRgb([angle, saturation, lightness]);

   return new RGB(rgb[0], rgb[1], rgb[2]);
}

module.exports = getRGB;
