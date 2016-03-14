angular
  .module('angular-material-steppers')
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  })
  .controller('AppController', function() {
    this.isLinear = false;
    this.isAlternative = false;

    this.toggleLinear = function() {
      this.isLinear = !this.isLinear;
    };

    this.toggleAlternative = function() {
      this.isAlternative = !this.isAlternative;
    };
  });
