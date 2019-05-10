var sha1 = require('js-sha1')
var hsluv = require('hsluv')

const REDGREEN = 'redgreen';
const BLUE = 'blue';

function clipValueToRangeFrom0To1(value) {
   return Math.max(0, Math.min(value, 1));
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

   return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
   };
}

module.exports = getRGB;
