var expect = require('chai').expect;
var getRGB = require('../index');

var testVectors = {
   noCorrection: {
      'Romeo': [0.281,0.790,1.000],
      'juliet@capulet.lit': [0.337,1.000,0.000],
      '😺': [0.347,0.756,1.000],
      'council': [0.732,0.560,1.000],
      'Universität Konstanz': [1.000,0.277413,1.000],
      '一致的颜色生成': [0.031000,0.940411,1.000000],
   },
   redGreenCorrection: {
      'Romeo': [1.000,0.674,0.000],
      'juliet@capulet.lit': [1.000,0.359,1.000],
      '😺': [1.000,0.708,0.000],
      'council': [0.732,0.904,0.000],
      'Universität Konstanz': [1.000,0.277413,1.000],
      '一致的颜色生成': [1.000,0.523589,0.000],
   },
   blueCorrection: {
      'Romeo': [1.000,0.674,0.000],
      'juliet@capulet.lit': [0.337,1.000,0.000],
      '😺': [1.000,0.708,0.000],
      'council': [0.732,0.904,0.000],
      'Universität Konstanz': [1.000,0.277413,1.000],
      '一致的颜色生成': [1.0000,0.523589,0.0000],
   }
}

function runTestCasesForRGBGeneration(testVectors, correction) {
   for (text in testVectors) {
      ((text, correction, expectedColor) => {
         it(text, function(){
            var color = getRGB(text, correction);

            expect(color.r, 'Red value').to.be.closeTo(expectedColor[0], 0.01);
            expect(color.g, 'Green value').to.be.closeTo(expectedColor[1], 0.01);
            expect(color.b, 'Blue value').to.be.closeTo(expectedColor[2], 0.01);
         });}
      )(text, correction, testVectors[text]);
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
