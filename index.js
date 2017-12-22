var sha1 = require('js-sha1')

const KR = 0.299;
const KG = 0.587;
const KB = 0.114;

const REDGREEN = 'redgreen';
const BLUE = 'blue';

function clipValueToRangeFrom0To1(value) {
   return Math.max(0, Math.min(value, 1));
}

function generateAngle(identifier, correction) {
   let hash = sha1(identifier);
   let first16bits = hash.slice(0, 4);
   let littleEndian = first16bits.slice(2) + first16bits.slice(0, 2);
   let angle = parseInt(littleEndian, 16) / 65536 * 2 * Math.PI;

   switch (correction) {
      case REDGREEN:
         angle = angle % Math.PI;
         break;
      case BLUE:
         angle = ((angle - (Math.PI / 2)) % Math.PI) + (Math.PI / 2);
         break;
   }

   return angle;
}

function generateCbCr(angle) {
   let cr = Math.sin(angle);
   let cb = Math.cos(angle);
   let factor;

   if (Math.abs(cr) > Math.abs(cb)) {
      factor = 0.5 / Math.abs(cr);
   } else {
      factor = 0.5 / Math.abs(cb);
   }

   cb = cb * factor;
   cr = cr * factor;

   return {
      cb: cb,
      cr: cr
   }
}

function CbCrToRGB(cb, cr, y) {
   let r = 2 * (1 - KR) * cr + y;
   let b = 2 * (1 - KB) * cb + y;
   let g = (y - KR * r - KB * b) / KG;

   return {
      r: clipValueToRangeFrom0To1(r),
      g: clipValueToRangeFrom0To1(g),
      b: clipValueToRangeFrom0To1(b)
   };
}

function getRGB(identifier, correction, y = 0.732) {
   let angle = generateAngle(identifier, correction);
   let space = generateCbCr(angle);

   return CbCrToRGB(space.cb, space.cr, y);
}

module.exports = getRGB;
