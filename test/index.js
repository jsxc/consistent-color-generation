var expect = require('chai').expect;
var getRGB = require('../index');

var testVectors = {
   noCorrection: {
      'Romeo': [0.865,0.000,0.686],
      'juliet@capulet.lit': [0.000,0.515,0.573],
      '😺': [0.872,0.000,0.659],
      'council': [0.918,0.000,0.394],
      'Board': [0.000,0.527,0.457],
   },
   redGreenCorrection: {
      'Romeo': [0.865,0.000,0.686],
      'juliet@capulet.lit': [0.742,0.359,0.000],
      '😺': [0.872,0.000,0.659],
      'council': [0.918,0.000,0.394],
      'Board': [0.904,0.000,0.494],
   },
   blueCorrection: {
      'Romeo': [0.000,0.535,0.350],
      'juliet@capulet.lit': [0.742,0.359,0.000],
      '😺': [0.000,0.533,0.373],
      'council': [0.000,0.524,0.485],
      'Board': [0.000,0.527,0.457],
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

describe('String generation', function() {
   it('rgb color string', function() {
      expect(getRGB('Romeo').toString()).to.be.equal('rgb(221, 0, 175)');
      expect(getRGB('juliet@capulet.lit').toString()).to.be.equal('rgb(0, 131, 146)');
      expect(getRGB('😺').toString()).to.be.equal('rgb(222, 0, 168)');
   });

   it('hex color string for', function() {
      expect(getRGB('Romeo').toString('hex')).to.be.equal('#dd0af');
      expect(getRGB('juliet@capulet.lit').toString('hex')).to.be.equal('#08392');
      expect(getRGB('😺').toString('hex')).to.be.equal('#de0a8');
   });
});