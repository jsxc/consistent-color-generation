var expect = require('chai').expect;
var getRGB = require('../index');

var testVectors = {
   noCorrection: {
      'Romeo': [0.281,0.790,1.000],
      'juliet@capulet.lit': [0.337,1.000,0.000],
      '😺': [0.347,0.756,1.000],
   },
   redGreenCorrection: {
      'Romeo': [0.938,0.799,0.000],
      'juliet@capulet.lit': [1.000,0.420,0.499],
      '😺': [0.912,0.812,0.000],
   },
   blueCorrection: {
      'Romeo': [0.031,1.000,0.472],
      'juliet@capulet.lit': [0.548,0.998,0.000],
      '😺': [0.031,1.000,0.505],
   }
}

function runTestCasesForRGBGeneration(testVectors, correction) {
   for (text in testVectors) {
      var expectedColor = testVectors[text];

      it(text, function(){
         var color = getRGB(text, correction);

         expect(color.r).to.be.closeTo(expectedColor[0], 0.01);
         expect(color.g).to.be.closeTo(expectedColor[1], 0.01);
         expect(color.b).to.be.closeTo(expectedColor[2], 0.01);
      });
   }
}

describe('RGB generation', function() {
   describe('without Color Vision Deficiency correction for', function() {
      runTestCasesForRGBGeneration(testVectors.noCorrection);
   });

   describe('with Red/Green-blindness correction for', function() {
      runTestCasesForRGBGeneration(testVectors.redGreenCorrection, 'redgreen');
   });

   describe('with Blue-blindness correction for', function() {
      runTestCasesForRGBGeneration(testVectors.blueCorrection, 'blue');
   });
});
